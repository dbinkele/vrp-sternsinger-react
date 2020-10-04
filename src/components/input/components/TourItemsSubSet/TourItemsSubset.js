import TransferList from "./TransferList";
import React from 'react';
import ChipsArray from "./ChipsArray";

import {intersection, not} from '../../../../util/tools'




const TourItemsSubset = ({tourItems, checked}) => {
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState(tourItems);

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

    const newItems = not(tourItems, left.concat(right));
    const newLeft = intersection(left, tourItems).concat(newItems);
    const newRight = intersection(right, tourItems);
    return (
        !checked ?
            <ChipsArray tourItems={newRight}/> :
            <TransferList left={newLeft} right={newRight} handleAllLeft={handleAllLeft} handleAllRight={handleAllRight}
                          handleCheckedLeft={handleCheckedLeft} handleCheckedRight={handleCheckedRight}/>

    )
}


export default TourItemsSubset;