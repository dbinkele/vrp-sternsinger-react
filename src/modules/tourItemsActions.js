import {handleActions} from 'redux-actions'

const ADD_TOUR_ITEM = 'ADD_TOUR_ITEM'
const REMOVE_TOUR_ITEM = 'REMOVE_TOUR_ITEM'
const UPDATE_TOUR_ITEM = 'UPDATE_TOUR_ITEM'
const REFRESH = 'REFRESH'

export const addTourItemActionCreator = item => {
    return {
        type: ADD_TOUR_ITEM,
        payload: item
    }
}

export const removeTourItemActionCreator = index => {
    return {
        type: REMOVE_TOUR_ITEM,
        payload: index
    }
}


export const updateTourItemActionCreator = (item, index) => {
    return {
        type: UPDATE_TOUR_ITEM,
        payload: {
            item: item,
            index: index
        }
    }
}

export const refreshTourItemAction = (items) => {
    return {
        type: REFRESH,
        payload: items
    }
}

export const tourItemsReducer = handleActions({
        [REFRESH]: (state, action) => {
            return {
                tourItems: action.payload
            };
        },
        [ADD_TOUR_ITEM]: (state, action) => {
            if (state.tourItems == null){
                return {
                    tourItems: [action.payload]
                };
            }
            return {
                tourItems: [...state.tourItems, action.payload]
            };
        },
        [REMOVE_TOUR_ITEM]: (state, action) => {
            const index = action.payload;
            return {
                tourItems: [
                    ...state.tourItems.slice(0, index),
                    ...state.tourItems.slice(index + 1)
                ]
            };
        },
        [UPDATE_TOUR_ITEM]: (state, action) => {
            const {item, index} = action.payload;
            return {
                tourItems: [
                    ...state.tourItems.slice(0, index),
                    item,
                    ...state.tourItems.slice(index + 1)
                ]
            };
        }
    },
    {
        tourItems: []
    })


