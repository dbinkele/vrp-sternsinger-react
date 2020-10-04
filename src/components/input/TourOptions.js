import React, {Fragment} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import {useForm} from "react-hook-form";
import Alert from '@material-ui/lab/Alert';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import TodoApp from "./components/ToDoList/ToDo"
import {makeStyles} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {connect} from "react-redux";


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

    const {register, control, handleSubmit, errors} = useForm();

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
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
                    {/*<Container maxWidth="sm">*/}
                    {/*    <Select options={tourItems}/>*/}
                    {/*</Container>*/}
                </AccordionDetails>
            </Accordion>
        )
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className={classes.root}>
                    {accordion("panel1", generalSettings(), "General Settings", "Basic Driver Values for the algorithm")}
                    {accordion("panel2", <TodoApp props/>, "Tour Constraints", "Tour Items  on the same tour")}
                    {accordion("panel3", <TodoApp props/>, "Tour Constraints Ordered", "Tour Items on the same tour in given order")}
                </div>


                <Button type="submit" size="large" variant="contained">
                    Next
                </Button>
            </form>
        </Fragment>
    );

    function generalSettings() {
        return <>
            <TextField
                id="email"
                label="Email address"
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                inputRef={register(
                    {
                        required: "Email is mandatory!",
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Must be a valid email"
                        }
                    })
                }
            />
            {errorHighlight(errors.email)}

            <TextField
                id="timeout"
                label="Timout Minutes"
                type="number"
                name="timeout"
                margin="normal"
                variant="outlined"
                defaultValue={3}
                error={!!errors.timeout}
                inputRef={
                    register(
                        {
                            required: "Please specify Timeout",
                            min: {value: 3, message: "Timeout must be at least 3."},
                            max: {value: 10, message: "Timeout can be at most 10."}
                        })}
            />
            {errorHighlight(errors.timeout)}

            <TextField
                id="vehicles"
                label="Number of Vehicles"
                type="number"
                name="vehicles"
                margin="normal"
                variant="outlined"
                defaultValue={1}
                error={!!errors.vehicles}
                inputRef={
                    register(
                        {
                            required: "Please specify Number of Vehicles",
                            min: {value: 1, message: "At lest one vehicle is required."},
                            max: {value: 20, message: "More than 20 vehicles not supported.."}
                        })}
            />
            {errorHighlight(errors.vehicles)}

            <TextField
                id="defaultDuration"
                label="Default Duration Minutes"
                type="number"
                name="timeout"
                margin="normal"
                variant="outlined"
                defaultValue={0}
                error={!!errors.timeout}
                inputRef={
                    register(
                        {
                            required: "Please specify Timeout",
                            min: {value: 0, message: "Must be greater zero."},
                        })}
            />
            {errorHighlight(errors.defaultDuration)}

            <TextField
                id="weight_visits"
                label="Importance of Tour Length Equality"
                type="number"
                name="weight_visits"
                margin="normal"
                variant="outlined"
                defaultValue={1}
                error={!!errors.weight_visits}
                inputRef={
                    register(
                        {
                            required: "Please specify Importance",
                            min: {value: 0, message: "Must be greater zero."},
                            max: {value: 100, message: "More than 100 not supported."}
                        })}
            />
            {errorHighlight(errors.weight_visits)}

            <TextField
                id="weight_lenght"
                label="Importance of Total Time Travelled"
                type="number"
                name="weight_length"
                margin="normal"
                variant="outlined"
                defaultValue={1}
                error={!!errors.weight_length}
                inputRef={
                    register(
                        {
                            required: "Please specify Importance",
                            min: {value: 0, message: "Must be greater zero."},
                            max: {value: 100, message: "More than 100 not supported."}
                        })}
            />
            {errorHighlight(errors.weight_length)}
        </>;
    }
};


const errorHighlight = (err) => {
    return (
        <div>
            {err &&
            <Snackbar
                open={true}
                autoHideDuration={6000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Alert variant="filled" severity="error">
                    {err.message}
                </Alert>
            </Snackbar>}
        </div>
    );
}

export default connect(state => {
    return state;
}, null)(TourOptionsForm);
