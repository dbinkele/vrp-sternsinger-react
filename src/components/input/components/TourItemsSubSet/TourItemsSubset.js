import TransferList from "./TransferList";
import React from 'react';
import ChipsArray from "./ChipsArray";

import {intersection, not} from '../../../../util/tools'
import {connect} from "react-redux";


const TourItemsSubset = (props) => {
    const {selected, tourItems, constraints} = props;
    const [right, setRight] = React.useState([]);

    const [left, setLeft] = React.useState(tourItems);

    const handleAllRight = () => {
        let rightValue = right.concat(left);
        setRight(rightValue);
        props.setConsts(rightValue);
        setLeft([]);
    };

    const handleCheckedRight = (leftChecked) => {
        let rightValue = right.concat(leftChecked);
        setRight(rightValue);
        props.addConst(leftChecked);

        setLeft(not(left, leftChecked));
    };

    const handleCheckedLeft = (rightChecked) => {
        setLeft(left.concat(rightChecked));
        let rightValue = not(right, rightChecked);
        setRight(rightValue);

        props.setConsts(rightValue);
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);

        props.setConsts([]);
    };

    const newItems = not(tourItems, left.concat(constraints));
    const newLeft = intersection(left, tourItems).concat(newItems);
    const newRight = intersection(constraints, tourItems);
    return (
        !selected ?
            <ChipsArray tourItems={newRight}/> :
            <TransferList left={newLeft} right={newRight} handleAllLeft={handleAllLeft} handleAllRight={handleAllRight}
                          handleCheckedLeft={handleCheckedLeft} handleCheckedRight={handleCheckedRight}/>

    )
}


export default connect(state => state, null)(TourItemsSubset);