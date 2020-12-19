import { combineReducers } from 'redux'
import {tourItemsReducer} from "./tourItemsActions";
import {todoReducer} from "./todoActions";
import {tourOptionsReducer} from "./tourOptionsActions";
import {settingsReducer} from "./SettingsReducer";

const allReducers = combineReducers({
    tourItemsReducer: tourItemsReducer,
    todoReducer: todoReducer,
    tourOptionsReducer: tourOptionsReducer,
    settingsReducer: settingsReducer
})

export default allReducers;