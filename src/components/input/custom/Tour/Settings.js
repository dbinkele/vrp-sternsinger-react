import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";

const Settings = ({register, errors}) => {
    const {enqueueSnackbar} = useSnackbar();

    const error = (message) => {
        if (message === undefined) return;
        enqueueSnackbar(message, {variant: 'error', preventDuplicate: true});
    }

    useEffect(() => {
        error(errors?.email?.message);
        error(errors?.timeout?.message);
        error(errors?.vehicles?.message);
        error(errors?.defaultDuration?.message);
        error(errors?.weight_visits?.message);
        error(errors?.weight_length?.message);
    }, [errors.email, errors.timeout,  errors.vehicles, errors.defaultDuration, errors.weight_visits, errors.weight_length, errors]);

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
                        max: {value: 20, message: "More than 20 vehicles not supported."}
                    })}
        />

        <TextField
            id="defaultDuration"
            label="Default Duration Minutes"
            type="number"
            name="defaultDuration"
            margin="normal"
            variant="outlined"
            defaultValue={1}
            error={!!errors.defaultDuration}
            inputRef={
                register(
                    {
                        required: "Please specify Timeout",
                        min: {value: 0, message: "Must be greater zero."},
                    })}
        />

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
    </>;
}

export default Settings;