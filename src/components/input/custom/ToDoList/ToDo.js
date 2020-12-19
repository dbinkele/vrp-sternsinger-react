import React, {memo, useEffect} from "react";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {addTodoActionCreator, removeTodoActionCreator, updateTodoActionCreator, popLastTodoAction} from "../../../../modules/todoActions";
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));


const TodoApp =
    memo((props) => {
        const {todoIdx, maxToDo} = props;
        const [globalConstraint, setGlobalConstraint] = React.useState([]);
        const {enqueueSnackbar} = useSnackbar();
        const dispatch = useDispatch();
        const todo = useSelector(state => state.todoReducer.todos[todoIdx]);


        const classes = useStyles();
        const passOnProps = {
            todoIdx: todoIdx,
            globalConstraint: globalConstraint,
            setGlobalConstraint: setGlobalConstraint
        }

        useEffect(() => {
            let noVehicles = Number(maxToDo);
            let diff = todo.length -noVehicles;
            for (let i = 0; i < diff; i++){
                dispatch(popLastTodoAction(todoIdx))
            }
        }, [maxToDo, todo.length, todoIdx, dispatch]);

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
                        let noVehicles = Number(maxToDo);
                        if (todo.length >= noVehicles) {
                            enqueueSnackbar(noVehicles + " vehicles can cover only " + noVehicles +
                                " tours", {variant: 'error'});
                            return;
                        }
                        dispatch(addTodoActionCreator(todoIdx));
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TodoList
                        {...{...passOnProps}}
                        onItemCheck={idx => dispatch(updateTodoActionCreator(todoIdx, idx))}
                        onItemRemove={idx => {
                            dispatch(removeTodoActionCreator(todoIdx, idx));
                        }}
                    />
                </Grid>
            </Grid>
        );
    })


export default TodoApp;