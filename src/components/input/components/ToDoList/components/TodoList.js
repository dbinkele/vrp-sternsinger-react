import React, {memo} from "react";
import {List} from "@material-ui/core";

import TodoListItem from "./TodoListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";


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
        const {todos} = props;
        return (
            <>
                {todos.length > 0 && (
                    <List className={classes.root} component="div">
                        {props.todos.map((todo, idx) => (
                            <TodoListItem
                                {...{...todo, ...props, ...{idx: idx}}}
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

export default TodoList;
