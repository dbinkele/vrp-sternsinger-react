import React, {useContext, useEffect, useState} from "react";
import MaterialTable from "material-table";
import {RouteIdContext} from "./RouteIdContext";

import {forwardRef} from 'react';

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

const tableIcons = {
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

const RouteData = () => {

    const [data, setData] = useState({routes: [], error: ""});
    const [routeId, setRouteId] = useContext(RouteIdContext);

    useEffect(() => {
        console.log("Da value is " + routeId)

        //let url = 'http://localhost:5000/data';
        let url = 'http://localhost:5000/vrp?job=' + routeId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.error_message){
                    setData({routes: data.result.routes, error: ""})
                } else {
                    setData({routes: [], error: data.error_message})
                }
            });

    }, [routeId])

    return (
        <React.Fragment>
            {data.routes.length > 0 && <h4>Routes for Token {routeId}</h4>}
            {data.error !== "" && <h4>Error: {data.error}</h4>}
            <MaterialTable
                options={{paging: false}}
                icons={tableIcons}
                title="Remote Data Preview"
                columns={[
                    {title: 'Id', field: 'id'},
                    {title: 'Postal Code', field: 'code'},
                    {title: 'City', field: 'city'},
                    {title: 'Street', field: 'street'},
                    {title: 'Number', field: 'number'},
                    {title: 'Name', field: 'name'},
                    {title: 'Hint', field: 'hint'},
                    {title: 'Latitude', field: 'lat'},
                    {title: 'Longitude', field: 'lon'},
                ]}
                data={data.routes}
            />
        </React.Fragment>

    )

}

export default RouteData