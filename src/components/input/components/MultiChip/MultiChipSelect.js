import React, {useState} from "react";
import {useForm, Controller,} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import MenuItem from "@material-ui/core/Menu";
import Downshift from "downshift";
import Chip from '@material-ui/core/Chip';
import CancelIcon from "@material-ui/icons/Cancel";

const styles = theme => ({
    chipContainer: {
        backgroundColor: "transparent",
        display: "inline-block",
        marginBottom: 10,
    },
    chip: {
        marginTop: 10,
        marginRight: 5
    },
    paper: {
        maxHeight: "150px",
        overflowY: "auto"
    }
});

const renderInput = inputProps => {
    const {InputProps, classes, availableItems} = inputProps;

    const allItemSelected = availableItems.length === 0;

    return (
        <TextField
            fullWidth
            label={
                allItemSelected ? "No more character to add" : "Choose a character"
            }
            disabled={allItemSelected}
            InputProps={{
                classes: {
                    input: classes.input
                },
                ...InputProps
            }}
        />
    );
};

const renderChipList = inputProps => {
    const {classes, selectedItem, onRemoveItem} = inputProps;
    return (
        <div className={classes.chipContainer}>
            {selectedItem.length > 0 &&
            selectedItem.map(item => (
                <Chip
                    key={item}
                    className={classes.chip}
                    label={item}
                    deleteIcon={<CancelIcon/>}
                    onDelete={() => onRemoveItem(item)}
                    onClick={() => onRemoveItem(item)}
                />
            ))}
        </div>
    );
};

const renderSuggestion = params => {
    const {item, index, itemProps, highlightedIndex, selectedItem} = params;
    const isHighlighted = highlightedIndex === index;
    const isSelected = selectedItem.indexOf(item.name) > -1;

    return (
        !isSelected && (
            <MenuItem
                {...itemProps}
                key={item.id}
                selected={isHighlighted}
                component="div"
            >
                {item.name}
            </MenuItem>
        )
    );
};

const getSuggestions = (inputValue, itemList) =>
    itemList.filter(item => item.name != null).filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

function MultiChipSelect(props) {
    const {control, classes, availableItems, onRemoveItem, ...rest} = props;

    function downshiftContent(selectedItem, getInputProps, toggleMenu, isOpen, inputValue, getItemProps, highlightedIndex) {
        return <div>
            {renderChipList({
                classes,
                onRemoveItem,
                selectedItem
            })}

            {renderInput({
                classes,
                selectedItem,
                availableItems,
                InputProps: {
                    ...getInputProps({
                        onClick: () => toggleMenu()
                    })
                }
            })}

            {isOpen && (
                <Paper className={classes.paper} square>
                    {getSuggestions(inputValue, availableItems).map((item, index) =>
                        renderSuggestion({
                            item,
                            index,
                            itemProps: getItemProps({
                                item: item.name
                            }),
                            highlightedIndex,
                            selectedItem
                        })
                    )}
                </Paper>
            )}
        </div>;
    }

    function getDownshift() {
        return (
            <Downshift {...rest}>
                {({
                      getInputProps,
                      getItemProps,
                      inputValue,
                      selectedItem,
                      highlightedIndex,
                      toggleMenu,
                      isOpen
                  }) => downshiftContent(selectedItem, getInputProps, toggleMenu, isOpen, inputValue, getItemProps, highlightedIndex)}
            </Downshift>
        );
    }

    return (
        getDownshift()
    );
}

export default withStyles(styles)(MultiChipSelect);
