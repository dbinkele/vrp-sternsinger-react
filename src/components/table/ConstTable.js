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

const validateNumber = (data) => {
    let obligatory = isObligatory(data);
    if (!obligatory.isValid) return obligatory;
    if (!onlyNumbersInString(data)) {
        return {isValid: false, helperText: 'Only Numbers!'}
    }
    return {isValid: true}
}

export const cols = [
    {
        title: 'Postal Code',
        field: 'code',
        validate: rowData => validatePostalCode(rowData.code),
    },
    {title: 'City', field: 'city'},
    {
        title: 'Street', field: 'street',
        validate: rowData => isObligatory(rowData.street),
    },
    {
        title: 'Number', field: 'number',
        validate: row => validateNumber(row.number)
    },
    {title: 'Name', field: 'name'},
    {title: 'Hint', field: 'hint'},
    {title: 'Latitude', field: 'lat'},
    {title: 'Longitude', field: 'lon'}
]