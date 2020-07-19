import React, {forwardRef, useContext, useEffect, useState} from "react";
import {url} from '../../util/tools'
import MaterialTable from "material-table";
import {RouteIdContext} from "../RouteIdContext";
import {cols, tableIcons} from './ConstTable'

const TourItems = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <MaterialTable
            options={{paging: false}}
            icons={tableIcons}
            title="Tour Items"
            columns={cols}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            resolve();
                        }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }, 1000)
                    }),
            }}
        />
    )

}


export default TourItems