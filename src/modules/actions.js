import {handleActions} from 'redux-actions'

const ADD_TOUR_ITEM = 'ADD_TOUR_ITEM'


export const addTourItenActionCreator = item => {
    const newVar = {
        type: ADD_TOUR_ITEM,
        payload: item
    };
    return newVar
}

export const reducer = handleActions({
        [ADD_TOUR_ITEM]: (state, action) => {
            return {
                tourItems: [...state.tourItems, action.payload]
            };
        }
    },
    {
        tourItems: []
    })


