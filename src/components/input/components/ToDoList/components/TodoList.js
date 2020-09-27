import React, {memo, useContext} from "react";
import {List, Paper, Grid, ListItemSecondaryAction, ListItem} from "@material-ui/core";

import TodoListItem from "./TodoListItem";
import TourItemsSubset from "../../TourItemsSubSet/TourItemsSubset";
import {TourItemsCtx} from "../../TourItems/TourItemsContext";
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
        return (
            <>
                {props.items.length > 0 && (

                    <List className={classes.root} component="div">
                        {props.items.map((todo, idx) => (
                            <TodoListItem
                                {...todo}
                                key={`TodoItem.${idx}`}
                                divider={idx !== props.items.length - 1}
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
