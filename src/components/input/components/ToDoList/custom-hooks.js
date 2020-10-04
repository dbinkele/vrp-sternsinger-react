import { useState } from "react";

export const useTodos = (props) => {
  const [todos, setTodos] = useState();

  return {
    todos,
    addTodo: () => {
        setTodos(
            todos.concat({
                checked: false
            })
        );
    },
    checkTodo: idx => {
      setTodos(
        todos.map((todo, index) => {
          if (idx !== index && todo.checked){
              todo.checked = false;
          }
          if (idx === index) {
            todo.checked = !todo.checked;
          }

          return todo;
        })
      );
    },
    removeTodo: idx => {
      setTodos(todos.filter((todo, index) => idx !== index));
    }
  };
};
