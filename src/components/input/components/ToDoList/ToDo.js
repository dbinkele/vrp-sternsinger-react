import React, {memo, useContext} from "react";


import {useTodos} from "./custom-hooks";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import TourItemsSubset from "../TourItemsSubSet/TourItemsSubset";
import {TourItemsCtx} from "../TourItems/TourItemsContext";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));

const TodoApp =
    memo(props => {
        const {todos, addTodo, checkTodo, removeTodo} = useTodos();
        const classes = useStyles();

        return (
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="flex-start"
                className={classes.root}
            >
                <Grid item xs={12}>
                    <AddTodo onButtonClick={() => {
                        addTodo();
                    }}/>
                </Grid>
                <Grid item xs={12} >
                    <TodoList
                        items={todos}
                        onItemCheck={idx => checkTodo(idx)}
                        onItemRemove={idx => removeTodo(idx)}
                    >
                    </TodoList>
                </Grid>
            </Grid>
        );
    })


export default TodoApp;