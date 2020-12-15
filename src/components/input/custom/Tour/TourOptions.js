import React, {Fragment, useEffect} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useForm} from "react-hook-form";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import TodoApp from "../ToDoList/ToDo"
import {makeStyles} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {useSelector} from "react-redux";
import Settings from "./Settings";


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
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const accordion = (panel, component, heading, details) => {
        const control = panel + "bh-content";
        const header = panel + "bh-header";
        return (
            <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls={control}
                    id={header}
                >
                    <Typography className={classes.heading}>{heading}</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {details}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {component}
                </AccordionDetails>
            </Accordion>
        )
    }


    return (
        <Fragment>

                <div className={classes.root}>
                    {accordion("panel1", <Settings register={register} errors={errors}/>, "General Settings", "Basic Driver Values for the algorithm")}

                    {/*{accordion("panel1", generalSettings(), "General Settings", "Basic Driver Values for the algorithm")}*/}
                    {accordion("panel4", <TodoApp {...{
                        ...props, ...{
                            todoIdx: 2,
                            maxToDo: watchVehicles
                        }
                    }}/>, "Tour Assignment", "Tour Items must be an the nth tour")}
                    {accordion("panel2", <TodoApp {...{
                        ...props, ...{
                            todoIdx: 0,
                            maxToDo: Number.MAX_VALUE
                        }
                    }}/>, "Tour Constraints", "Tour Items  on the same tour in arbitrary order")}
                    {accordion("panel3", <TodoApp {...{
                        ...props, ...{
                            todoIdx: 1,
                            maxToDo: Number.MAX_VALUE
                        }
                    }}/>, "Tour Constraints Ordered", "Tour Items on the same tour in given order")}
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
