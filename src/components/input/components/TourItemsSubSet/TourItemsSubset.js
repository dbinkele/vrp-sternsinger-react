import TransferList from "./TransferList";
import React, {useContext, useEffect} from 'react';
import ChipsArray from "./ChipsArray";

import {not} from '../../../../util/tools'



const TourItemsSubset = ({tourItems, readOnly}) => {
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState(tourItems);

    useEffect(() => {
        handleAllLeft();
        setLeft([...tourItems])
    }, [tourItems]);

    const handleAllRight = () => {
        let rightValue = right.concat(left);
        setRight(rightValue);
        setLeft([]);
    };

    const handleCheckedRight = (leftChecked) => {
        let rightValue = right.concat(leftChecked);
        setRight(rightValue);
        setLeft(not(left, leftChecked));
    };

    const handleCheckedLeft = (rightChecked) => {
        setLeft(left.concat(rightChecked));
        let rightValue = not(right, rightChecked);
        setRight(rightValue);

    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    return (
        readOnly ?
            <ChipsArray tourItems={right}/> :
            <TransferList left={left} right={right} handleAllLeft={handleAllLeft} handleAllRight={handleAllRight}
            handleCheckedLeft={handleCheckedLeft} handleCheckedRight={handleCheckedRight}/>

    )
}

export default TourItemsSubset;