import React, {useEffect, useState} from "react";
import {usePrevious, arrayDiff, uuid} from '../../util/tools'
import MaterialTable from "material-table";
import {cols, tableIcons} from './ConstTable'

const TourItems = () => {

    const [data, setData] = useState([]);

    // Get the previous value (was passed into hook on last render)
    const prevData = usePrevious(data);

    useEffect(() => {
        if (prevData && data && prevData.length !== data.length) {
            // ToDo find updated and added items via id...
            let addedData = arrayDiff(prevData, data);

            let prevDataCopy = [...prevData]
            addedData.forEach(row => {
                setCoordinates(row, prevDataCopy, setData)
            });
        }
    }, [data])

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
                            newData.id = uuid();
                            setData([...data, newData]);

                            resolve();
                        }, 100)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;
                            setData([...dataUpdate]);

                            resolve();
                        }, 100)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);

                            resolve()
                        }, 100)
                    }),
            }}
        />
    )

}

const setCoordinates = (row, prevData, setData) => {
    let url = `https://nominatim.openstreetmap.org/search?format=json&country=de&postalcode=${row.code}&street=${row.number}+${row.street}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let firstHit = data[0];
                row.lat = firstHit.lat;
                row.lon = firstHit.lon;
                console.log(row);
                prevData.push(row);
                setData(prevData);
            }
        });
}

export default TourItems