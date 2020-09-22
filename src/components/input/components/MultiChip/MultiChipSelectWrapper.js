import React, {useState} from "react";
import {FormControl, FormGroup, FormLabel} from "@material-ui/core";


import MultiChipSelect from "./MultiChipSelect";

const allItems = [
    {id: 1, name: 'John'},
    {id: 2, name: 'David'},
    {id: 3, name: 'Daniel'},
    {id: 4, name: 'Richard'},
    {id: 5, name: 'Paul'},
    {id: 6, name: 'George'},
    {id: 7, name: 'Eric'},
];

const MultiChipSelectWrapper = ({control}) => {

    const [state, setState] = useState({
        items: allItems,
        selectedItem: [],
        isOpen: true,
        highlightedIndex: null,
        inputValue: ""
    })


    const handleChangeInput = (inputVal) => {
        const t = inputVal.split(",");
        if (JSON.stringify(t) !== JSON.stringify(state.selectedItem)) {
            setState(({selectedItem, items}) => ({
                inputValue: inputVal,
                selectedItem: selectedItem,
                items: items
            }))
        }
    };

    const addSelectedItem = (item) => {
        setState(({selectedItem, items}) => ({
            inputValue: "",
            selectedItem: [...selectedItem, item],
            items: items.filter(i => i.name !== item)
        }));
    }

    const handleChange = (selectedItem) => {
        if (state.selectedItem.includes(selectedItem)) {
            removeSelectedItem(selectedItem);
        } else {
            addSelectedItem(selectedItem);
        }
    };

    const removeSelectedItem = (item) => {
        setState(({selectedItem, items}) => ({
            inputValue: "",
            selectedItem: selectedItem.filter(i => i !== item),
            items: [...items, {name: item, id: item.toLowerCase()}]
        }));
    };



    return (
        <FormGroup>
            <FormControl>
                <FormLabel>Find a Star Wars character</FormLabel>
                <MultiChipSelect
                    control={control}
                    onInputValueChange={handleChangeInput}
                    inputValue={state.inputValue}
                    availableItems={state.items}
                    selectedItem={state.selectedItem}
                    onChange={handleChange}
                    onRemoveItem={removeSelectedItem}
                />
            </FormControl>
        </FormGroup>
    )

}


export default MultiChipSelectWrapper