import React, {Fragment, useEffect} from "react";
import Button from "@material-ui/core/Button";
import {useForm} from "react-hook-form";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import TodoApp from "../ToDoList/ToDo"
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Settings from "./Settings";
import CustomAccordion from "./CustomAccordion";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));


const TourOptionsForm = (props) => {
    const {setStartTime} = props;
    const theState = useSelector(state => state);

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

    function constraintsToTourItemsIndex(tourItemsIds, index) {
        let constr0 = theState.todoReducer.todos[index].map(x => x.constraints);
        return constr0.map(x => x.map(y => y.id).map(z => tourItemsIds.indexOf(z)));
    }

    return (
        <Fragment>

            <div className={classes.root}>
                <CustomAccordion panel={"panel1"} component={<Settings register={register} errors={errors} control={control}/>}
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
                }}/>} heading={"Tour Constraints"} details={"Tour Items  on the same tour in arbitrary order"} expanded={expanded}
                                 setExpanded={setExpanded}/>

                <CustomAccordion panel={"panel4"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 2,
                        maxToDo: Number.MAX_VALUE
                    }
                }}/>} heading={"Tour Constraints Ordered"} details={"Tour Items on the same tour in given order"} expanded={expanded}
                                 setExpanded={setExpanded}/>

                <CustomAccordion panel={"panel5"} component={<TodoApp {...{
                    ...props, ...{
                        todoIdx: 3,
                        maxToDo: Number.MAX_VALUE
                    }
                }}/>} heading={"Tour Constraints Different"} details={"Tour Items that must be on different routes"} expanded={expanded}
                                 setExpanded={setExpanded}/>

            </div>


            <Button
                color="secondary"
                variant="outlined"
                onClick={async () => {
                    const generalSettingsValid = await trigger();
                    if (!generalSettingsValid) return;

                    let settingsValues = getValues();
                    console.log("HAndler " + settingsValues.depot);
                    console.log(theState.todoReducer[0]);
                    let tourItemsIds = theState.tourItemsReducer.tourItems.map(x => x.id);
                    const data = {
                        recipent: settingsValues.email,
                        data: theState.tourItemsReducer.tourItems,
                        constraints: {
                            num_visits_to_max_tour_len_ration: [
                                Number(settingsValues.weight_visits),
                                Number(settingsValues.weight_length)
                            ],
                            timeout: Number(settingsValues.timeout),
                            depot: tourItemsIds.indexOf(settingsValues.depot),
                            num_vehicles: Number(settingsValues.vehicles),
                            fixed_arcs: [],
                            assign_to_route: constraintsToTourItemsIndex(tourItemsIds, 0),
                            same_roue: constraintsToTourItemsIndex(tourItemsIds, 1),
                            same_route_ordered: constraintsToTourItemsIndex(tourItemsIds, 2),
                            different_route: constraintsToTourItemsIndex(tourItemsIds, 3)
                        }
                    };

                    console.log(data);
                    var i = 9;
                }}
            >
                Next
            </Button>

        </Fragment>
    );
};


export default TourOptionsForm;
