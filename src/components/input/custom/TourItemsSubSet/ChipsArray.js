import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';


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

const ChipsArray = ({tourItems, moveConstraints}) =>  {
    const classes = useStyles();
    const SortableItem = SortableElement(({item}) =>
        <ListItem key={item.id} button={true}>
            <Chip
                size="small"
                icon={<HomeWorkTwoToneIcon />}
                label={item.label}
                className={classes.chip}
            />
        </ListItem>);

    const SortableList = SortableContainer(({items}) => {
        return (
            <List component="div" className="topContainer" width={"100%"}>
                {items.map((item, index) => (
                    <SortableItem key={`item-${item.id}`} index={index} item={item} />
                ))}
            </List>
        );
    });


    return (
        <SortableList items={tourItems} onSortEnd={moveConstraints} />
    );
}

export default ChipsArray;