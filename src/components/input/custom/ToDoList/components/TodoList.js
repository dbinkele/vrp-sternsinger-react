import React, {memo} from "react";
import {List} from "@material-ui/core";

import TodoListItem from "./TodoListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from 'react-redux';
import {addConstraintActionCreator, setConstraintActionCreator} from "../../../../../modules/todoActions";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: '1200px',
        overflow: "scroll",
        padding: '0 0px',
        color: 'white',
    },
}));


const TodoList = memo(props => {
        const classes = useStyles();
        const {todoIdx, globalConstraint, setGlobalConstraint, onItemRemove, onItemCheck} = props;
        const dispatch = useDispatch();
        const todo = useSelector(state => state.todoReducer.todos[todoIdx]);

        return (
            <>
                {todo.length > 0 && (
                    <List className={classes.root} component="div">
                        {todo.map((todoItem, idx) => (
                            <TodoListItem
                                {...{
                                    globalConstraint: globalConstraint,
                                    setGlobalConstraint: setGlobalConstraint,
                                    addConst: constr => dispatch(addConstraintActionCreator(todoIdx, constr, idx)),
                                    setConsts: constr => dispatch(setConstraintActionCreator(todoIdx, constr, idx)),
                                    selected: todo[idx].checked,
                                    constraints: todo[idx].constraints
                                }}
                                key={`TodoItem.${idx}`}
                                divider={idx !== todo.length - 1}
                                onButtonClick={() => onItemRemove(idx)}
                                onCheckBoxToggle={() => onItemCheck(idx)}
                            />
                        ))}
                    </List>

                )}
            </>
        )
    }
);

export default TodoList;
