import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: 200,
        height: 230,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = ({left, right, handleAllRight, handleCheckedRight, handleCheckedLeft, handleAllLeft}) => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };



    const handleCheckedRightInternal = () => {
        handleCheckedRight(leftChecked);
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeftInernal = () => {
        handleCheckedLeft(rightChecked);
        setChecked(not(checked, rightChecked));
    };



    const customList = (items, header) => (
        <Paper  style={{width: '200px', height: '200px', maxHeight: 'unset', maxWidth: 'unset', overflow: 'auto'}}
               className={classes.paper}>
            <List style={{width: '100%'}} component="div" role="list"
                  subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                          {header}
                      </ListSubheader>
                  }

            >
                {items.map((value) => {
                    const labelId = value.id;

                    return (
                        <ListItem key={labelId} role="listitem" button={true} onClick={handleToggle(value)}   >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.label}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Paper>
    );

    return (
        <Grid container direction="row" className={classes.root}  >
            <Grid item>{customList(left, 'Available')}</Grid>
            <Grid item>
                <Grid container direction="column">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRightInternal}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeftInernal}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right, 'Selected')}</Grid>
        </Grid>
    );
}

export default TransferList
