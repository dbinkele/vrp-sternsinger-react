import React, {useContext} from "react";
import MaterialTable from "material-table";
import {cols, tableIcons} from '../../ConstTable'
import {TourItemsCtx} from './TourItemsContext'
import {timeorderedUuid} from "../../../../util/tools";
import {connect} from 'react-redux'
import {addTourItenActionCreator} from '../../../../modules/actions.js'

const TourItems = (props) => {
    const [tourItems2, setTourItems] = useContext(TourItemsCtx);

    const {items} = props;

    return (
        <MaterialTable
            options={{paging: false}}
            icons={tableIcons}
            title="Tour Items"
            columns={cols}
            data={items}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            withCoordinates(newData,
                                () => {
                                    newData.id = timeorderedUuid();
                                    newData.label = newData.code + '/' + newData.street + '. ' + newData.number
                                    newData.label += !!newData.name ? '/' + newData.name : ''
                                    let newVar = [...tourItems2, newData];
                                    //setTourItems(newVar);
                                    props.addTourItems(newData);
                                    resolve();
                                },
                                reject);
                        }, 10)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            withCoordinates(newData, () => {
                                const dataUpdate = [...tourItems2];
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
                            const dataDelete = [...tourItems2];
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


export default connect(state => {
        const {tourItems} = state;
        return {items: tourItems};
    }
    , {
        addTourItems: addTourItenActionCreator
    })(TourItems)