import {handleActions} from 'redux-actions'

const ADD_TODO_ITEM = 'ADD_TODO_ITEM'
const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'
const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'


export const addTodoActionCreator = () => {
    return {
        type: ADD_TODO_ITEM
    }
}

export const removeTodoActionCreator = (index) => {
    return {
        type: REMOVE_TODO_ITEM,
        payload: {index: index}
    }
}


export const updateTodoActionCreator = (index) => {
    return {
        type: UPDATE_TODO_ITEM,
        payload: {index: index}
    }
}

export const todoReducer = handleActions({
        [ADD_TODO_ITEM]: (state, action) => {
            return {
                todos: state.todos.concat({
                        checked: false
                    }
                )
            }
        },
        [REMOVE_TODO_ITEM]:
            (state, action) => {
                const idx = action.payload.index;
                return {
                    todos: state.todos.filter((todo, index) => idx !== index)
                }

            },
        [UPDATE_TODO_ITEM]:
            (state, action) => {
                const idx = action.payload.index;
                return {
                    todos: state.todos.map((todo, index) => {
                        if (idx !== index && todo.checked) {
                            return {checked: false};
                        }
                        if (idx === index) {
                            return {checked: !todo.checked}
                        }
                        return todo;
                    })
                }
            }
    },
    {
        todos: []
    }
)


