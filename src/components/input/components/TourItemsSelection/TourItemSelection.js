import React, {useState, useContext} from "react";
import {TourItemProvider} from './TourItemsSelectionContext'
import Countries from "./Countries";
import ChipsArray from "./ChipsArray";

const TourItemsSelection = (control) => {
    return <TourItemProvider>
        <Countries control={control}/>
        <ChipsArray/>
    </TourItemProvider>;

}

export default TourItemsSelection