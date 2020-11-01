import React, {memo} from "react";
import {List} from "@material-ui/core";

import TodoListItem from "./TodoListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {connect} from "react-redux";
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
        const {todos, todoIdx} = props;
        return (
            <>
                {todos.length > 0 && (
                    <List className={classes.root} component="div">
                        {props.todos.map((todo, idx) => (
                            <TodoListItem
                                {...{
                                    ...todo, ...props,
                                    ...{
                                        idx: idx, todoIdx: todoIdx,
                                        addConst: makeAddConst(todoIdx, idx, props),
                                        setConsts: makeSetConsts(todoIdx, idx, props)
                                    }

                                }}
                                key={`TodoItem.${idx}`}
                                divider={idx !== props.todos.length - 1}
                                onButtonClick={() => props.onItemRemove(idx)}
                                onCheckBoxToggle={() => props.onItemCheck(idx)}
                            />
                        ))}
                    </List>

                )}
            </>
        )
    }
);

const makeAddConst = (toDoIdx, idx, props) => {
    return (constr) => {
        props.addConstraint(toDoIdx, constr, idx);
    }
}

const makeSetConsts = (toDoIdx, idx, props) => {
    return (constrs) => {
        props.setConstraint(toDoIdx, constrs, idx);
    }
}

export default connect(state => state, {
    addConstraint: addConstraintActionCreator,
    setConstraint: setConstraintActionCreator
})(TodoList);
