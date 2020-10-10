import { combineReducers } from 'redux'
import {tourItemsReducer} from "./tourItemsActions";
import {todoReducer} from "./todoActions";
import {tourOptionsReducer} from "./tourOptionsActions";

const allReducers = combineReducers({
    tourItemsReducer: tourItemsReducer,
    todoReducer: todoReducer,
    tourOptionsReducer: tourOptionsReducer
})

export default allReducers;