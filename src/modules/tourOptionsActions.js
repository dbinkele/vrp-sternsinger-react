import {handleActions} from 'redux-actions'

const ADD_CONSTRAINT = 'ADD_CONSTRAINT'


export const addTodoActionCreator = () => {
    return {
        type: ADD_CONSTRAINT
    }
}


export const tourOptionsReducer = handleActions({
        [ADD_CONSTRAINT]: (state, action) => {
            return {
                todos: state.todos.concat({
                        checked: false
                    }
                )
            }
        }

    },
    {
        tourOptions: {
            constraints: [],
            constraintsOrdered: []
        }
    }
)


