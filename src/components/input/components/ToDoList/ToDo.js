import React, {memo} from "react";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
import {addTodoActionCreator, removeTodoActionCreator, updateTodoActionCreator} from "../../../../modules/todoActions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));


const TodoApp =
    memo((props) => {
        const classes = useStyles();
        const customProps = {
            todos: props.todos,
            tourItems: props.tourItems
        }
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
                        props.addTodo();
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TodoList
                        {...{...props, ...customProps}}
                        onItemCheck={idx => props.checkTodo(idx)}
                        onItemRemove={idx => props.removeTodo(idx)}
                    >
                    </TodoList>
                </Grid>
            </Grid>
        );
    })


export default connect(state => {
    return {
        todos: state.todoReducer.todos,
        tourItems: state.tourItemsReducer.tourItems
    };
},  {
    addTodo  : addTodoActionCreator,
    removeTodo: removeTodoActionCreator,
    checkTodo: updateTodoActionCreator
})(TodoApp);