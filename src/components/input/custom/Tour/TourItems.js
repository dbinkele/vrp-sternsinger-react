import React from "react";
import MaterialTable from "material-table";
import {tableIcons, tourItemsCols} from './ConstTable'
import {timeorderedUuid, url} from "../../../../util/tools";
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
    const daUrl = url() + `coordinates?address=${row.street} ${row.number}&country=DE&code=${row.code}&locality=${row.city}`
    axios.get(daUrl, {timeout: 5000})
        .then(res => res.data)
        .then(data => {
            if (JSON.stringify(data) !=='{}') {
                let firstHit = data;
                row.lat = firstHit.lat;
                row.lon = firstHit.lon;
                resolve();
                return;
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