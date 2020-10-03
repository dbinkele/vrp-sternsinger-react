import { combineReducers } from 'redux'
import {tourItemsReducer} from "./tourItemsActions";

const allReducers = combineReducers({
    tourItemsReducer: tourItemsReducer
})

export default allReducers;