import React, {forwardRef} from "react";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


import {
    MuiPickersUtilsProvider, TimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const moment = require('moment')

export const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const onlyNumbersInString = (str) => {
    let pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
}

const isObligatory = (data) => {
    if (!data || data === "") {
        return {isValid: false, helperText: 'Is obligatory'}
    }
    return {isValid: true}
}

const validateNumber = (data) => {
    let obligatory = isObligatory(data);
    if (!obligatory.isValid) return obligatory;
    if (data <= 0) {
        return {isValid: false, helperText: 'must be greater zero'}
    }
    return {isValid: true}
}


const validatePostalCode = (code) => {
    let obligatory = isObligatory(code);
    if (!obligatory.isValid) return obligatory;
    if (!onlyNumbersInString(code)) {
        return {isValid: false, helperText: 'Only Numbers!'}
    }
    if (code.length !== 5) {
        return {isValid: false, helperText: 'Exactly 5 digits'}
    }
    return {isValid: true}
}


const round = (data, dec) => {
    return !!data ? parseFloat(data).toFixed(dec) : "";
}

const Timepicker2 = (props) => {
    const {value, onChange, error, helperText} = props;
    return <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker
                clearable
                ampm={false}
                emptyLabel={''}
                value={!value ? null : value}
                onChange={onChange}
            />
        </MuiPickersUtilsProvider>
        {error && <p style={{color: 'red'}}>{helperText} </p>}
    </>
}

export const cols = [
    {
        title: 'Postal Code',
        field: 'code',
        validate: rowData => validatePostalCode(rowData.code),
    },
    {
        title: 'City', field: 'city', cwidth: 'auto'
    },
    {
        title: 'Street', field: 'street', cellStyle: {wordBreak: 'break-all'},
        validate: rowData => isObligatory(rowData.street),
    },
    {
        title: 'Number', field: 'number', type: 'numeric',
        validate: rowData => validateNumber(rowData.number),
    },
    {title: 'Name', field: 'name'},
    {
        title: 'Duration Minutes', field: 'duration', type: 'numeric',
    },
    {title: 'Hint', field: 'hint'}
]

export const tourItemsCols = (startTime) => {
    return cols.concat([
        {
            title: "Start Time Window",
            field: "timewindowstart",
            type: "datetime",
            validate: rowData => validateStartTimeWindow(rowData, startTime),
            render: (data) => renderTime(data),
            editComponent: Timepicker2
        },
        {
            title: "End Time Window",
            field: "timewindowend",
            type: "datetime",
            validate: rowData => validateEndTimeWindow(rowData, startTime),
            render: (data) => renderTime(data),
            editComponent: Timepicker2
        },
        {
            title: 'Latitude', field: 'lat', editable: 'never',
            render: rowData => round(rowData.lat, 4)
        },
        {
            title: 'Longitude', field: 'lon', editable: 'never',
            render: rowData => round(rowData.lon, 4)
        }])
}

const renderTime = data => {
    if (data.time === null || !data.time) {
        return "";
    }
    return moment(data.time).format("hh:mm A");
}


function timewindowstartAbsent(rowData) {
    return !("timewindowstart" in rowData) || rowData.timewindowstart == null;
}

function timewindowEndAbsent(rowData) {
    return !("timewindowend" in rowData) || rowData.timewindowend == null;
}

const validateStartTimeWindow = (rowData, startTime) => {
    if(!timewindowstartAbsent(rowData) && startTime != null){
        if(moment(rowData.timewindowstart).isBefore(moment(startTime))){
            return {isValid: false, helperText: 'End of time window not after global start time ' + moment(startTime).format("hh:mm A")}
        }
    }
    if (timewindowstartAbsent(rowData) && !timewindowEndAbsent(rowData)) {
        return {isValid: false, helperText: 'End of time window given, but not start'}
    }
    if (!timewindowstartAbsent(rowData) && !timewindowEndAbsent(rowData)) {
        if (moment(rowData.timewindowstart).isAfter(moment(rowData.timewindowend))) {
            return {isValid: false, helperText: 'Start of time window before end'}
        }
    }
    return {isValid: true}
}



const validateEndTimeWindow = (rowData, startTime) => {
    if(!timewindowEndAbsent(rowData) && startTime != null){
        if(moment(rowData.timewindowend).isBefore(moment(startTime))){
            return {isValid: false, helperText: 'End of time window not after global start time ' + moment(startTime).format("hh:mm A")}
        }
    }
    if (timewindowEndAbsent(rowData) && !timewindowstartAbsent(rowData)) {
        return {isValid: false, helperText: 'Start of time window given, but not end'}
    }
    if (!timewindowstartAbsent(rowData) && !timewindowEndAbsent(rowData)) {
        if (moment(rowData.timewindowstart).isAfter(moment(rowData.timewindowend))) {
            return {isValid: false, helperText: 'Start of time window before end'}
        }
    }
    return {isValid: true}
}