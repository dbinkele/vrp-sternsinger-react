import {handleActions} from 'redux-actions'

const ADD_CONSTRAINT = 'ADD_CONSTRAINT'
const REMOVE_CONSTRAINT = 'REMOVE_CONSTRAINT'

export const addConstraintActionCreator = () => {
    return {
        type: ADD_CONSTRAINT
    }
}

export const removeConstraintActionCreator = () => {
    return {
        type: ADD_CONSTRAINT
    }
}


export const tourOptionsReducer = handleActions({
        [ADD_CONSTRAINT]: (state, action) => {
            return {
                todos: state.todos.concat([])
            }
        },
        [REMOVE_CONSTRAINT]: (state, action) => {
            const index = action.payload;
            return {
                tourItems: [
                    ...state.constraints.slice(0, index),
                    ...state.constraints.slice(index + 1)
                ]
            };
        }

    },
    {
        tourOptions: {
            constraints: [],
            constraintsOrdered: []
        }
    }
)


