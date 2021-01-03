import React, {Fragment, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import TodoApp from "../ToDoList/ToDo"
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Settings from "./Settings";
import CustomAccordion from "./CustomAccordion";
import {url} from '../../../../util/tools'
import {useSnackbar} from "notistack";

const moment = require('moment')

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));


const TourOptionsForm = (props) => {
    const {setStartTime} = props;
    const theState = useSelector(state => state);
    const {enqueueSnackbar} = useSnackbar();

    const {register, errors, watch, getValues, trigger, control} = useForm({
        mode: 'onChange',
        defaultValues: {
            depot: "",
            email: "",
            timeout: 3,
            vehicles: 1,
            defaultDuration: 1,
            weight_visits: 1,
            weight_lenght: 1
        }
    });

    const watchVehicles = watch("vehicles", 1);
    const watchStartTime = watch("starttime");

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    useEffect(() => {
        setStartTime(old => watchStartTime);
    }, [watchStartTime]);

    const onClick = () => {
        if (theState.tourItemsReducer.tourItems.length <= 1) {
            enqueueSnackbar("There must be more than one tour item!", {variant: 'error'});
            return;
        }
        uiToJson(trigger, getValues, theState)
            .then(json => {
                if (json !== null) {
                    postRequest(json)
                        .then(response => {
                            enqueueSnackbar("Successful submitted! Job ID " + response.id + " Job Status: " + response.status , {variant: 'info'});
                        })
                        .catch(error => {
                            enqueueSnackbar(error.message, {variant: 'error'});
                        })
                }
            });
    }

    const onDownload = () => {
        if (theState.tourItemsReducer.tourItems.length > 0) {
            download(theState.tourItemsReducer.tourItems);
        } else {
            enqueueSnackbar("There must be at least one tour item!", {variant: 'warning'});
        }
    }

    return (
        <Fragment>

            <div className={classes.root}>
                <CustomAccordion panel={"panel1"}
                                 component={<Settings register={register} errors={errors} control={control}/>}
                                 heading={"General Settings"} details={"Basic Driver Values for the algorithm"}
                                 expanded={expanded} setExpanded={setExpanded}/>
                <CustomAccordion panel={"panel2"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 0,
                        maxToDo: watchVehicles
                    }
                }}/>} heading={"Tour Assignment"} details={"Tour Items must be an the nth tour"} expanded={expanded}
                                 setExpanded={setExpanded}/>
                <CustomAccordion panel={"panel3"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 1,
                        maxToDo: Number.MAX_VALUE
                    }
                }}/>} heading={"Tour Constraints"} details={"Tour Items  on the same tour in arbitrary order"}
                                 expanded={expanded}
                                 setExpanded={setExpanded}/>

                <CustomAccordion panel={"panel4"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 2,
                        maxToDo: Number.MAX_VALUE
                    }
                }}/>} heading={"Tour Constraints Ordered"} details={"Tour Items on the same tour in given order"}
                                 expanded={expanded}
                                 setExpanded={setExpanded}/>

                <CustomAccordion panel={"panel5"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 3,
                        maxToDo: Number.MAX_VALUE
                    }
                }}/>} heading={"Tour Constraints Different"} details={"Tour Items that must be on different routes"}
                                 expanded={expanded}
                                 setExpanded={setExpanded}/>

            </div>


            <Button
                color="secondary"
                variant="outlined"
                onClick={onClick}
            >
                Submit
            </Button>
            <Button
                color="secondary"
                variant="outlined"
                onClick={onDownload}
            >
                Download
            </Button>


        </Fragment>
    );
};

const postRequest = (json) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(json)
    };
    return fetch(url() + 'vrp', requestOptions)
        .then(async response => {
            //  console.log(await response.text());
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            return data;
        });
}


function constraintsToTourItemsIndex(theState, tourItemsIds, index) {
    return theState.todoReducer.todos[index]
        .map(x => x.constraints)
        .map(x => x.map(y => y.id)
            .map(z => tourItemsIds.indexOf(z)));
}


const uiToJson = async (trigger, getValues, theState) => {
    const generalSettingsValid = await trigger();
    if (!generalSettingsValid) return null;

    let settingsValues = getValues();
    let tourItemsIds = theState.tourItemsReducer.tourItems.map(x => x.id);
    let res = {
        recipent: settingsValues.email,
        data: theState.tourItemsReducer.tourItems,
        constraints: {
            num_visits_to_max_tour_len_ration: [
                Number(settingsValues.weight_visits),
                Number(settingsValues.weight_length)
            ],
            timeout: Number(settingsValues.timeout) * 60,
            depot: tourItemsIds.indexOf(settingsValues.depot),
            planningType: settingsValues.planningType,
            num_vehicles: Number(settingsValues.vehicles),
            duration: Number(settingsValues.defaultDuration),
            fixed_arcs: [],
            assign_to_route: constraintsToTourItemsIndex(theState, tourItemsIds, 0),
            same_route: constraintsToTourItemsIndex(theState, tourItemsIds, 1),
            same_route_ordered: constraintsToTourItemsIndex(theState, tourItemsIds, 2),
            different_route: constraintsToTourItemsIndex(theState, tourItemsIds, 3),
            dwell_duration: dwellDuration(theState, tourItemsIds, settingsValues.defaultDuration),
            time_windows: timeWindow(theState, tourItemsIds, settingsValues.starttime)
        }
    };
    console.log(res);
    return res;
}

function download(json) {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(json)], {type: "text/plain"});
    a.href = URL.createObjectURL(file);
    a.download = "touritems.json";
    a.click();
}

const dwellDuration = (theState, tourItemsIds, defaultDuration) => {
    return theState.tourItemsReducer.tourItems.filter(x => x.hasOwnProperty('duration')).map(item => ({
        id: tourItemsIds.indexOf(item.id),
        duration: item.duration * 60
    })).concat([{id: -1, duration: Number(defaultDuration) * 60}]);
}

function timeDiffMinutes(later, earlier) {
    return Math.round(moment.duration(moment(later).diff(earlier)).asMinutes());
}

const timeWindow = (theState, tourItemsIds, starttime) => {
    let result = theState.tourItemsReducer.tourItems
        .filter(x => x.hasOwnProperty('timewindowstart') && x.hasOwnProperty('timewindowend'))
        .filter(x => x.timewindowstart !== null && x.timewindowend != null)
        .map(item => ({
            id: tourItemsIds.indexOf(item.id),
            interval: [timeDiffMinutes(item.timewindowstart, starttime), timeDiffMinutes(item.timewindowend, starttime)]
        }));
    return result.concat([{
        id: 0,
        interval: [0, 0]
    }]);

}
export default TourOptionsForm;
