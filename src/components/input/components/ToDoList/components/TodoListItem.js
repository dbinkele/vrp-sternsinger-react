import React, {memo, useContext} from "react";

import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import TourItemsSubset from "../../TourItemsSubSet/TourItemsSubset";
import {TourItemsCtx} from "../../TourItems/TourItemsContext";


const TodoListItem = memo((props) => {
        const [tourItems, setTourItems] = useContext(TourItemsCtx);
        
        return (<ListItem divider={props.divider} ContainerComponent="div">
                <Checkbox
                    onClick={props.onCheckBoxToggle}
                    checked={props.checked}
                    disableRipple
                />
                {props.children}
                <TourItemsSubset tourItems={tourItems} readOnly={!props.checked}/>
                <ListItemSecondaryAction component="div">
                    <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
);

export default TodoListItem;
