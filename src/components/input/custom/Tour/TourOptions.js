import React, {Fragment} from "react";
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
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));


const TourOptionsForm = (props) => {

    const theState = useSelector(state => state);

    const {register, errors, watch, getValues, trigger} = useForm({
        mode: 'onChange'
    });

    const watchVehicles = watch("vehicles", 1);

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Fragment>

            <div className={classes.root}>
                <CustomAccordion panel={"panel1"} component={<Settings register={register} errors={errors}/>}
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

            </div>


            <Button
                color="secondary"
                variant="outlined"
                onClick={async () => {
                    const generalSettingsValid = await trigger();
                    console.log("HAndler " + getValues());
                    console.log(theState);
                    var i = 9;
                }}
            >
                Next
            </Button>

        </Fragment>
    );
};


export default TourOptionsForm;
