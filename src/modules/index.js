import { combineReducers } from 'redux'
import {tourItemsReducer} from "./tourItemsActions";
import {todoReducer} from "./todoActions";

const allReducers = combineReducers({
    tourItemsReducer: tourItemsReducer,
    todoReducer: todoReducer
})

export default allReducers;