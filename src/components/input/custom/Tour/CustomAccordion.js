import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const CustomAccordion = ({panel, component, heading, details, expanded, setExpanded}) => {

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const classes = useStyles();

    const control = panel + "bh-content";
    const header = panel + "bh-header";
    return (
        <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls={control}
                id={header}
            >
                <Typography className={classes.heading}>{heading}</Typography>
                <Typography className={classes.secondaryHeading}>
                    {details}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {component}
            </AccordionDetails>
        </Accordion>
    )
}

export default CustomAccordion;