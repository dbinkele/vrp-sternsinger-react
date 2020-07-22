import React, {useEffect, useState} from "react";
import {usePrevious, partition, timeorderedUuid, uuidCompare} from '../../util/tools'
import MaterialTable from "material-table";
import {cols, tableIcons} from './ConstTable'
const _ = require('lodash/core');

const TourItems = () => {
    const [data, setData] = useState([]);

    // Get the previous value (was passed into hook on last render)
    const prevData = usePrevious(data);

    useEffect(() => {
        if (prevData && data) {
            let [added, updated, untouched] = diff(prevData, data);
            [...added, ...updated].forEach(row => {
                setCoordinates(row, () => {
                    untouched.push(row);
                    setData(untouched.sort((x, y) => uuidCompare(x.id, y.id)));
                })
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
                            newData.id = timeorderedUuid();
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
                            setData(dataUpdate);

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

const setCoordinates = (row, effect) => {
    let url = `https://nominatim.openstreetmap.org/search?format=json&country=de&postalcode=${row.code}&street=${row.number}+${row.street}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let firstHit = data[0];
                row.lat = firstHit.lat;
                row.lon = firstHit.lon;
                effect();
            }
        });
}


const diff = (prevData, data) => {
    let prevDataId = prevData.map(x => x.id);
    let [added, present] = partition(data, x => !prevDataId.includes(x.id));
    let [updated, untouched] = partition(present,x => !prevData.find(y => _.isEqual(x, y)))
    return [added, updated, untouched];
}


export default TourItems