import React, {Fragment, useContext} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import {useForm} from "react-hook-form";
import Alert from '@material-ui/lab/Alert';


import 'react-dual-listbox/lib/react-dual-listbox.css';


import TransferList from "./components/TourItemsSubSel/TransferList";

import TodoApp from "./components/ToDoList/ToDo";

import MultiChipSelectWrapper from "./components/MultiChip/MultiChipSelectWrapper"

const TourOptionsForm = props => {
    const {register, control, handleSubmit, errors} = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <TodoApp/>
                {/*<TransferList leftStuff={[]} onChange={x => console.log("----------> daX " + x)}/>*/}
                {textBoxes()}

                <Button type="submit" size="large" variant="contained">
                    Next
                </Button>
            </form>
        </Fragment>
    );

    function textBoxes() {
        return <>
            <TextField
                id="emial"
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

export default TourOptionsForm;
