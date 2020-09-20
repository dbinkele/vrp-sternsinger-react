import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

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

export default function ChipsArray() {
    const classes = useStyles();
    const [tourItems, setTourItems] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 4, label: 'Vue.js' },
    ]);

    const handleDelete = (chipToDelete) => () => {
        setTourItems((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };

    return (
        <Paper component="ul" className={classes.root}>
            {tourItems.map((data) => {
                return (
                    <li key={data.key}>
                        <Chip
                            label={data.label}
                            onDelete={handleDelete(data)}
                            className={classes.chip}
                        />
                    </li>
                );
            })}
        </Paper>
    );
}