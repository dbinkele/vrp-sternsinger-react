import {handleActions} from "redux-actions";


const SET_DEPOT = "SET_DEPOT";

export const setDepot = (id) => {
    return {
        type: SET_DEPOT,
        payload: {
            id: id
        }
    }
}

export const settingsReducer = handleActions({
        [SET_DEPOT]: (state, action) => {
            const {id} = action.payload;
            return {...state, depot: id};
        }
    },
    {
        depot: '',
        email: "",
        timeout: 3,
        vehicles: 1,
        duration: 1,
        weight_visits: 1,
        weight_lenght: 1
    }
)
