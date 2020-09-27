import React, {useContext} from "react";
import MaterialTable from "material-table";
import {cols, tableIcons} from '../../ConstTable'
import {TourItemsCtx} from './TourItemsContext'
import {timeorderedUuid} from "../../../../util/tools";

const TourItems = () => {
    const [tourItems, setTourItems] = useContext(TourItemsCtx);

    return (
        <MaterialTable
            options={{paging: false}}
            icons={tableIcons}
            title="Tour Items"
            columns={cols}
            data={tourItems}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            withCoordinates(newData,
                                () => {
                                    newData.id = timeorderedUuid();
                                    newData.label = newData.code + '/' + newData.street + '. ' + newData.number
                                    newData.label += !!newData.name ? '/' + newData.name : ''
                                    setTourItems([...tourItems, newData]);
                                    resolve();
                                },
                                reject);
                        }, 10)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            withCoordinates(newData, () => {
                                const dataUpdate = [...tourItems];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setTourItems(dataUpdate);
                                resolve();
                            }, reject)
                        }, 10)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...tourItems];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setTourItems([...dataDelete]);

                            resolve()
                        }, 100)
                    }),
            }}
        />
    )

}


const withCoordinates = (row, resolve, reject) => {
    let url = `https://nominatim.openstreetmap.org/search?format=json&country=de&postalcode=${row.code}&street=${row.number}+${row.street}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                let firstHit = data[0];
                if (firstHit.lat != null && firstHit.lon != null) {
                    row.lat = firstHit.lat;
                    row.lon = firstHit.lon;
                    resolve();
                    return;
                }
            }
            reject("Wrong Address!")
        })
}


export default TourItems