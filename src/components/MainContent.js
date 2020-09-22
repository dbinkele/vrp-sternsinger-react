import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import TourItems from "./input/components/TourItems/TourItems";
import TourOptions from "./input/TourOptions";
import {TourItemProvider} from './input/components/TourItems/TourItemsContext'
import {RouteIdProvider} from "./RouteIdContext";
import RoutesIdForm from "./RoutesIdForm";
import TourResult from "./input/TourResult";
import MultiChipSelectWrapper from "./input/components/MultiChip/MultiChipSelectWrapper";


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
            <div className={classes.toolbar}/>
            <div className={classes.title}>
                <Typography variant='h6'>Title</Typography>
            </div>
            <div className={classes.content}>
                <TourItemProvider>
                    <TourItems/>
                    <TourOptions/>
                </TourItemProvider>
                <RouteIdProvider>
                    <RoutesIdForm/>
                    <TourResult/>
                </RouteIdProvider>
            </div>
        </main>
    );
}

export default MainContent;