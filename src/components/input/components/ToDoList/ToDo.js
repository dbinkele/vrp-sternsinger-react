import React, {memo} from "react";


import {useTodos} from "./custom-hooks";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";


const TodoApp = memo(props => {
    const {todos, addTodo, checkTodo, removeTodo} = useTodos();

    return (
        <>
            <AddTodo
                onButtonClick={() => {addTodo();}}
            />
            <TodoList
                items={todos}
                onItemCheck={idx => checkTodo(idx)}
                onItemRemove={idx => removeTodo(idx)}
            />
        </>
    );
});

export default TodoApp;