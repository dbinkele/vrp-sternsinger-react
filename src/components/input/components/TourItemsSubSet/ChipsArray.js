import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

const ChipsArray = ({tourItems}) =>  {
    const classes = useStyles();

    // const handleDelete = (chipToDelete) => () => {
    //     setTourItems((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // };

    return (

        <List component="div" className="topContainer">
            {tourItems.map((data) => {
                return (
                    <ListItem key={data.key} button={true}>
                        <Chip
                            size="small"
                            icon={<HomeWorkTwoToneIcon />}
                            label={data.label}
                            className={classes.chip}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default ChipsArray;