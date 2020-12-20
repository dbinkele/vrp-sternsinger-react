import {handleActions} from 'redux-actions'

const ADD_TODO_ITEM = 'ADD_TODO_ITEM'
const REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM'
const UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM'
const POP_TODO_ITEM = 'POP_TODO_ITEM'

const ADD_CONSTRAINT_ITEM = 'ADD_CONSTRAINT_ITEM'
const SET_CONSTRAINT_ITEM = 'SEt_CONSTRAINT_ITEM'


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

export const popLastTodoAction = (toDoIdx) => {
    return {
        type: POP_TODO_ITEM,
        payload: {
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

export const addConstraintActionCreator = (toDoIdx, constraint, constrIdx) => {
    return {
        type: ADD_CONSTRAINT_ITEM,
        payload: {
            toDoIdx: toDoIdx,
            constraint: constraint,
            constrIdx: constrIdx
        }
    }
}

export const setConstraintActionCreator = (toDoIdx, constraints, constrIdx) => {
    return {
        type: SET_CONSTRAINT_ITEM,
        payload: {
            toDoIdx: toDoIdx,
            constraints: constraints,
            constrIdx: constrIdx
        }
    }
}

function newState(state, toDoIdx, changedTodo) {
    return {
        todos: [
            ...state.todos.slice(0, toDoIdx),
            changedTodo,
            ...state.todos.slice(toDoIdx + 1)
        ]
    };
}

export const todoReducer = handleActions({
        [ADD_TODO_ITEM]: (state, action) => {
            const {toDoIdx} = action.payload;
            const changedTodo = state.todos[toDoIdx].concat({
                checked: false,
                constraints: []
            });
            return newState(state, toDoIdx, changedTodo)
        },
        [REMOVE_TODO_ITEM]:
            (state, action) => {
                const {toDoIdx, index} = action.payload;
                const changedTodo = state.todos[toDoIdx].filter((todo, currIndex) => index !== currIndex);
                return newState(state, toDoIdx, changedTodo)
            },
        [POP_TODO_ITEM]:
            (state, action) => {
                const {toDoIdx} = action.payload;
                const index = state.todos[toDoIdx].length - 1;
                const changedTodo = state.todos[toDoIdx].filter((todo, currIndex) => index !== currIndex);
                return newState(state, toDoIdx, changedTodo)
            },
        [UPDATE_TODO_ITEM]:
            (state, action) => {
                const {toDoIdx, index} = action.payload;
                const changedTodo = updateHlp(state, toDoIdx, index);
                return newState(state, toDoIdx, changedTodo)
            },
        [ADD_CONSTRAINT_ITEM]: (state, action) => {
            const {toDoIdx, constraint, constrIdx} = action.payload;
            const oldToDo = state.todos[toDoIdx];
            let changedTodo = [
                ...oldToDo.slice(0, constrIdx),
                {
                    checked: oldToDo[constrIdx].checked,
                    constraints: oldToDo[constrIdx].constraints.concat(constraint)
                },
                ...oldToDo.slice(constrIdx + 1)
            ];
            return newState(state, toDoIdx, changedTodo)
        },
        [SET_CONSTRAINT_ITEM]: (state, action) => {
            const {toDoIdx, constraints, constrIdx} = action.payload;
            const oldToDo = state.todos[toDoIdx];
            let changedTodo = [
                ...oldToDo.slice(0, constrIdx),
                {
                    checked: oldToDo[constrIdx].checked,
                    constraints: constraints
                },
                ...oldToDo.slice(constrIdx + 1)
            ];
            return newState(state, toDoIdx, changedTodo)
        }
    },
    {
        todos: [[], [], [], []]
    }
)

const updateHlp = (state, toDoIdx, index) => {
    return state.todos[toDoIdx].map((todo, currIndex) => {
        if (index !== currIndex && todo.checked) {
            return {
                checked: false,
                constraints: todo.constraints
            };
        }
        if (index === currIndex) {
            return {
                checked: !todo.checked,
                constraints: todo.constraints
            }
        }
        return todo;
    })
}


