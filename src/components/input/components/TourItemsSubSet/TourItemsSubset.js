import TransferList from "./TransferList";
import React from 'react';
import ChipsArray from "./ChipsArray";

import {not} from '../../../../util/tools'
import {connect} from "react-redux";
import {
    addTourItemActionCreator,
    removeTourItemActionCreator,
    updateTourItemActionCreator
} from "../../../../modules/tourItemsActions";


const TourItemsSubset = (props) => {
    const {tourItems, checked} = props;
    const [right, setRight] = React.useState([]);
    const [left, setLeft] = React.useState(tourItems);

    // useEffect(() => {
    //     handleAllLeft();
    //     setLeft([...tourItems])
    // }, [tourItems]);

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
        !checked ?
            <ChipsArray tourItems={right}/> :
            <TransferList left={left} right={right} handleAllLeft={handleAllLeft} handleAllRight={handleAllRight}
                          handleCheckedLeft={handleCheckedLeft} handleCheckedRight={handleCheckedRight}/>

    )
}

export default connect(state => {
        const {tourItems} = state.tourItemsReducer;
        return {items: tourItems};
    }
    , {
        addTourItem: addTourItemActionCreator,
        removeTourItem: removeTourItemActionCreator,
        updateTourItem: updateTourItemActionCreator
    })(TourItemsSubset);