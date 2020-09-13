import React, {useState, useContext} from "react";
import {TourItemSelectionProvider} from './TourItemsSelectionContext'
import Countries from "./Countries";
import ChipsArray from "./ChipsArray";

const TourItemsSelection = (control) => {
    return <TourItemSelectionProvider>
        <Countries control={control}/>
        <ChipsArray/>
    </TourItemSelectionProvider>;

}

export default TourItemsSelection