import React, {useContext, useEffect, useState} from "react";
import {url} from '../../util/tools'
import MaterialTable from "material-table";
import {RouteIdContext} from "../RouteIdContext";
import {tableIcons, cols} from './ConstTable'

const TourResult = () => {

    const [data, setData] = useState({routes: [], error: ""});
    const [routeId] = useContext(RouteIdContext);

    useEffect(() => {
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
                title="Computed Tour Result"
                columns={[
                    {title: 'Id', field: 'id'},
                    ...cols
                ]}
                data={data.routes}
            />
        </React.Fragment>

    )

}


export default TourResult