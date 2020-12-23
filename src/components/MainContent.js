import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import TourItems from "./input/custom/Tour/TourItems";
import TourOptions from "./input/custom/Tour/TourOptions";
import {RouteIdProvider} from "./RouteIdContext";
import RoutesIdForm from "./RoutesIdForm";
import TourResult from "./input/custom/Tour/TourResult";
import {SnackbarProvider} from "notistack";


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
    const [startTime, setStartTime] = useState(null);
    return (
        <main className={classes.fullWidth}>
            <div className={classes.toolbar}/>
            <div className={classes.title}>
                <Typography variant='h6'>Tour Planning</Typography>
            </div>
            <div className={classes.content}>
                <SnackbarProvider maxSnack={3}>
                    <TourItems startTime={startTime}/>
                    <TourOptions setStartTime={setStartTime}/>
                </SnackbarProvider>

                {/*<RouteIdProvider>
                    <RoutesIdForm/>
                    <TourResult/>
                </RouteIdProvider>*/}
            </div>
        </main>
    );
}

export default MainContent;