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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {connect} from "react-redux";
import {
    addTourItemActionCreator,
    removeTourItemActionCreator,
    updateTourItemActionCreator
} from "../../../../../modules/tourItemsActions";


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
                    <TourItemsSubset props/>
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

export default connect(state => {
        return state;
    }
    , null)(TodoListItem);
