import React from "react";
import MaterialTable from "material-table";
import {tableIcons, tourItemsCols} from './ConstTable'
import {timeorderedUuid} from "../../../../util/tools";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {
    addTourItemActionCreator,
    removeTourItemActionCreator,
    updateTourItemActionCreator
} from '../../../../modules/tourItemsActions.js'

import {useSnackbar} from 'notistack';
import Upload from "../../../../util/UploadTourItems";


const TourItems = (props) => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const items = useSelector(state => state.tourItemsReducer.tourItems);

    const {startTime} = props;

    return (
        <>
            <MaterialTable
                options={{paging: false}}
                icons={tableIcons}
                title="Tour Items"
                columns={tourItemsCols(startTime)}
                data={items}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                withCoordinates(newData,
                                    () => {
                                        newData.id = timeorderedUuid();
                                        newData.label = newData.code + '/' + newData.street + '. ' + newData.number;
                                        newData.label += !!newData.name ? '/' + newData.name : '';
                                        dispatch(addTourItemActionCreator(newData));
                                        //props.addTourItem(newData);
                                        resolve();
                                    },
                                    (arg) => {
                                        enqueueSnackbar(arg, {variant: 'error'});
                                        reject(arg)
                                    });
                            }, 10)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                withCoordinates(newData, () => {
                                    const index = oldData.tableData.id;
                                    dispatch(updateTourItemActionCreator(newData, index));
                                   // props.updateTourItem(newData, index);
                                    resolve();
                                }, (arg) => {
                                    enqueueSnackbar(arg, {variant: 'error'});
                                    reject(arg)
                                })
                            }, 10)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const index = oldData.tableData.id;
                                dispatch(removeTourItemActionCreator(index));
                               // props.removeTourItem(index);
                                resolve();
                            }, 10)
                        }),
                }}
            />
            <Upload/>
            </>
    )

}


const withCoordinates = (row, resolve, reject) => {
    let url = `https://nominatim.openstreetmap.org/search?format=json&country=de&postalcode=${row.code}&street=${row.number}+${row.street}`;
    axios.get(url, {timeout: 5000})
        .then(res => res.data)
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
            if (err.response) {
                // client received an error response (5xx, 4xx)
                reject("Bad Response  " + err);
            } else if (err.request) {
                // client never received a response, or request never left
                reject("No Response  " + err);
            } else {
                // anything else
                reject("Unspecified Error  " + err);
            }
        })
}


export default TourItems;