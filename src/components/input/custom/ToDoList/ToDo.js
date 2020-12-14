import React, {memo} from "react";


import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {addTodoActionCreator, removeTodoActionCreator, updateTodoActionCreator} from "../../../../modules/todoActions";
import {useSnackbar} from "notistack";
import {useDispatch} from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));


const TodoApp =
    memo((props) => {
        const {todoIdx, maxToDo} = props;
        const [globalConstraint, setGlobalConstraint] = React.useState([]);
        let [todosCount, setTodosCount] = React.useState(0);
        const {enqueueSnackbar} = useSnackbar();
        const dispatch = useDispatch();

        const classes = useStyles();
        const passOnProps = {
            todoIdx: todoIdx,
            globalConstraint: globalConstraint,
            setGlobalConstraint: setGlobalConstraint
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
                        let noVehicles = Number(maxToDo);
                        if (todosCount >= noVehicles) {
                            enqueueSnackbar(noVehicles + " vehicles can cover only " + noVehicles +
                                " tours", {variant: 'error'});
                            return;
                        }
                        setTodosCount(oldVal => oldVal + 1);
                        dispatch(addTodoActionCreator(todoIdx));
                    }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TodoList
                        {...{...passOnProps}}
                        onItemCheck={idx => dispatch(updateTodoActionCreator(todoIdx, idx))}
                        onItemRemove={idx => {
                            setTodosCount(oldVal => (oldVal - 1));
                            dispatch(removeTodoActionCreator(todoIdx, idx));
                        }}
                    />
                </Grid>
            </Grid>
        );
    })


export default TodoApp;