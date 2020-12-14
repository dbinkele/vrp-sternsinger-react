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

const TodoListItem = memo((props) => {
    const {selected, constraints, globalConstraint, setGlobalConstraint, addConst, setConsts, onButtonClick} = props;
    return (<ListItem divider={props.divider} ContainerComponent="div">
                <ListItemIcon>
                    <Checkbox
                        onClick={props.onCheckBoxToggle}
                        checked={selected}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText>
                    <TourItemsSubset  {...{...{selected, constraints, globalConstraint, setGlobalConstraint, addConst, setConsts}}}/>
                </ListItemText>
                <ListItemSecondaryAction component="div">
                    <IconButton aria-label="Delete Todo" onClick={onButtonClick}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
);

export default TodoListItem;
