import React, {forwardRef, useContext, useEffect, useState} from "react";
import {url} from '../../util/tools'
import MaterialTable from "material-table";
import {RouteIdContext} from "../RouteIdContext";
import {tableIcons} from './ConstTable'

const TourResult = () => {

    const [data, setData] = useState({routes: [], error: ""});
    const [routeId] = useContext(RouteIdContext);

    useEffect(() => {
        console.log("Da value is " + routeId)

        //let url = 'http://localhost:5000/data';
        fetch(url() + 'vrp?job=' + routeId)
            .then(response => response.json())
            .then(data => {
                if (!data.error_message) {
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


export default TourResult