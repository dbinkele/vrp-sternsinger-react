import React, {memo, useContext} from "react";


import {useTodos} from "./custom-hooks";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import {TourItemsCtx} from "../TourItems/TourItemsContext";


const TodoApp = memo(props => {
    const {todos, addTodo, checkTodo, removeTodo} = useTodos();
    const [tourItems, setTourItems] = useContext(TourItemsCtx);

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