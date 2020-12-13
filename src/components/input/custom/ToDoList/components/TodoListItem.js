import React, {memo} from "react";

import {
    ListItem,
    Checkbox,
    IconButton,
    ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import TourItemsSubset from "../../TourItemsSubSet/TourItemsSubset";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";

const TodoListItem = memo((props) => {

        return (<ListItem divider={props.divider} ContainerComponent="div">
                <ListItemIcon>
                    <Checkbox
                        onClick={props.onCheckBoxToggle}
                        checked={props.checked}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText>
                    <TourItemsSubset  {...{...props}}/>
                </ListItemText>
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
