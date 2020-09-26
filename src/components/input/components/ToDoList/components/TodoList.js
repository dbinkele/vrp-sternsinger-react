import React, {memo} from "react";
import {List, Paper, Grid, ListItemSecondaryAction, ListItem} from "@material-ui/core";

import TodoListItem from "./TodoListItem";
import TourItemsSubset from "../../TourItemsSubSet/TourItemsSubset";

const TodoList = memo(props => (
    <>
        {props.items.length > 0 && (
            <Paper style={{margin: 16}}>
                <List style={{overflow: "scroll"}} component="div">
                    {props.items.map((todo, idx) => (
                        <TodoListItem
                            {...todo}
                            key={`TodoItem.${idx}`}
                            divider={idx !== props.items.length - 1}
                            onButtonClick={() => props.onItemRemove(idx)}
                            onCheckBoxToggle={() => props.onItemCheck(idx)}
                        >
                            <TourItemsSubset tourItems={[]} readOnly={!props.checked}/>

                        </TodoListItem>
                    ))}
                </List>
            </Paper>
        )}
    </>
));

export default TodoList;
