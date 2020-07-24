import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TourResult from './input/TourResult'
import RoutesIdForm from "./RoutesIdForm";
import {RouteIdProvider} from "./RouteIdContext";
import TourItems from "./input/TourItems";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    fullWidth: {
        width: '100%',
    },
}));

function MainContent() {
    const classes = useStyles();

    return (
        <main className={classes.fullWidth}>
            <div className={classes.toolbar} />
            <div className={classes.title}>
                <Typography variant='h6'>Title</Typography>
            </div>
            <div className={classes.content}>
                <TourItems />
             {/*   <RouteIdProvider>
                    <RoutesIdForm />
                    <TourResult />
                </RouteIdProvider>
*/}            </div>
        </main>
    );
}

export default MainContent;