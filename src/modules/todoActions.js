import {handleActions} from 'redux-actions'

const ADD_TODO_ITEM = 'ADD_TODO_ITEM'
const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'
const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'


export const addTodoActionCreator = (toDoIdx) => {
    return {
        type: ADD_TODO_ITEM,
        payload: {
            toDoIdx: toDoIdx
        }
    }
}

export const removeTodoActionCreator = (toDoIdx, index) => {
    return {
        type: REMOVE_TODO_ITEM,
        payload: {
            index: index,
            toDoIdx: toDoIdx
        }
    }
}


export const updateTodoActionCreator = (toDoIdx, index) => {
    return {
        type: UPDATE_TODO_ITEM,
        payload: {
            index: index,
            toDoIdx: toDoIdx
        }
    }
}

export const todoReducer = handleActions({
        [ADD_TODO_ITEM]: (state, action) => {
            const {toDoIdx} = action.payload;
            const changedTodo = state.todos[toDoIdx].concat({
                checked: false
            });
            return {
                todos: [
                    ...state.todos.slice(0, toDoIdx),
                    changedTodo,
                    ...state.todos.slice(toDoIdx + 1)
                ]
            }
        },
        [REMOVE_TODO_ITEM]:
            (state, action) => {
                const {toDoIdx, index} = action.payload;
                const changedTodo = state.todos[toDoIdx].filter((todo, currIndex) => index !== currIndex);
                return {
                    todos: [
                        ...state.todos.slice(0, toDoIdx),
                        changedTodo,
                        ...state.todos.slice(toDoIdx + 1)
                    ]
                }
            },
        [UPDATE_TODO_ITEM]:
            (state, action) => {
                const {toDoIdx, index} = action.payload;
                const changedTodo = updateHlp(state, toDoIdx, index);
                return {
                    todos: [
                        ...state.todos.slice(0, toDoIdx),
                        changedTodo,
                        ...state.todos.slice(toDoIdx + 1)
                    ]
                }
            }
    },
    {
        todos: [[], []]
    }
)

const updateHlp = (state, toDoIdx, index) => {
    return state.todos[toDoIdx].map((todo, currIndex) => {
        if (index !== currIndex && todo.checked) {
            return {checked: false};
        }
        if (index === currIndex) {
            return {checked: !todo.checked}
        }
        return todo;
    })
}


