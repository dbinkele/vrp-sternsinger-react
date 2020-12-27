import TextField from "@material-ui/core/TextField";
import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import Select from '@material-ui/core/Select';
import {useSelector} from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {Controller} from "react-hook-form";
import MenuItem from "@material-ui/core/MenuItem";
import {MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const Settings = ({register, errors, control}) => {
    const {enqueueSnackbar} = useSnackbar();
    const tourItems = useSelector(state => (state.tourItemsReducer.tourItems));

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
        error(errors?.depot?.message);
        error(errors?.starttime?.message);
    }, [errors.email, errors.timeout, errors.vehicles, errors.defaultDuration, errors.weight_visits,
        errors.weight_length, errors.depot, errors.starttime, errors]);

    return <>
        <FormControl
            style={{minWidth: 300}}
            error={Boolean(errors.depot)}
        >
            <InputLabel id="demo-simple-select-label">
                Select Start Location
            </InputLabel>

            <Controller
                as={
                    <Select>
                        {tourItems.map(item => (<MenuItem key={item.id}
                                                          value={item.id}>{item.code}/{item.street}/{item.number}/{item.name}</MenuItem>))}
                    </Select>
                }
                name="depot"
                rules={{required: "Start Location is required"}}
                control={control}
            />
        </FormControl>

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
            defaultValue={1}
            error={!!errors.timeout}
            inputRef={
                register(
                    {
                        required: "Please specify Timeout",
                        min: {value: 1, message: "Timeout must be at least 1."},
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

        <Controller
            name="starttime"
            control={control}
            render={({ onChange, value }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <TimePicker
                        clearable
                        ampm={false}
                        label="Select Start Time"
                        value={!value? null : value}
                        onChange={onChange}
                        error={Boolean(errors.starttime)}
                    />
                </MuiPickersUtilsProvider>
            )}
            rules={{required: "Start Time is required"}}
        />
        </>;
}

export default Settings;