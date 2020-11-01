import React from "react";
import MaterialTable from "material-table";
import {cols, tableIcons} from '../../ConstTable'
import {timeorderedUuid} from "../../../../util/tools";
import {connect} from 'react-redux'
import axios from 'axios';
import {
    addTourItemActionCreator,
    removeTourItemActionCreator,
    updateTourItemActionCreator
} from '../../../../modules/tourItemsActions.js'

const TourItems = (props) => {
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
                                    props.addTourItem(newData);
                                    resolve();
                                },
                                reject);
                        }, 10)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            withCoordinates(newData, () => {
                                const index = oldData.tableData.id;
                                props.updateTourItem(newData, index);
                                resolve();
                            }, reject)
                        }, 10)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const index = oldData.tableData.id;
                            props.removeTourItem(index);
                            resolve();
                        }, 10)
                    }),
            }}
        />
    )

}


const withCoordinates = (row, resolve, reject) => {
    let url = `https://nominatim.openstreetmap.org/search?format=json&country=de&postalcode=${row.code}&street=${row.number}+${row.street}`;
    axios.get(url, {timeout: 5000})
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
        .catch(err => {
            reject("Error " + err);
        })
}


export default connect(state => {
        const {tourItems} = state.tourItemsReducer;
        return {items: tourItems};
    }
    , {
        addTourItem: addTourItemActionCreator,
        removeTourItem: removeTourItemActionCreator,
        updateTourItem: updateTourItemActionCreator
    })(TourItems)