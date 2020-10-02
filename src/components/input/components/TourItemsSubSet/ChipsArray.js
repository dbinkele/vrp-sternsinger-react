import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
        items: arrayMove(items, oldIndex, newIndex),
    }));
};


const ChipsArray = ({tourItems}) =>  {
    const classes = useStyles();

    const SortableItem = SortableElement(({data}) =>
        <ListItem key={data.key} button={true}>
            <Chip
                size="small"
                icon={<HomeWorkTwoToneIcon />}
                label={data.label}
                className={classes.chip}
            />
        </ListItem>);

    const SortableList = SortableContainer(({items}) => {
        return (
            <List component="div" className="topContainer" width={"100%"}>
                {items.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </List>
        );
    });


    return (
        <SortableList items={tourItems} onSortEnd={onSortEnd} />
    );
}

export default ChipsArray;