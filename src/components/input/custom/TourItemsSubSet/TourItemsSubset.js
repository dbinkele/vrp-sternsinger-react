import TransferList from "./TransferList";
import React from 'react';
import ChipsArray from "./ChipsArray";

import {intersection, not} from '../../../../util/tools'
import {arrayMove} from "react-sortable-hoc";
import {useSelector} from "react-redux";


const TourItemsSubset = (props) => {
    const {selected, constraints, globalConstraint, setGlobalConstraint, setConsts, addConst} = props;

    const tourItems = useSelector(state => (state.tourItemsReducer.tourItems));

    const [right, setRight] = React.useState([]);

    let availableTourItems = not(tourItems, globalConstraint);
    const [left, setLeft] = React.useState(availableTourItems);

    const handleAllRight = () => {
        let rightValue = right.concat(left);
        setRight(rightValue);
        setConsts(rightValue);
        setGlobalConstraint((old) => (old.concat(left)))
        setLeft([]);
    };

    const handleCheckedRight = (leftChecked) => {
        let rightValue = right.concat(leftChecked);
        setRight(rightValue);
        addConst(leftChecked);
        setGlobalConstraint((old) => (old.concat(leftChecked)))
        setLeft(not(left, leftChecked));
    };

    const handleCheckedLeft = (rightChecked) => {
        setLeft(left.concat(rightChecked));
        let rightValue = not(right, rightChecked);
        setRight(rightValue);
        setGlobalConstraint(old => (not(old, rightChecked)));
        setConsts(rightValue);
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
        setGlobalConstraint(old => (not(old, right)));
        setConsts([]);
    };

    const newItems = not(availableTourItems, left.concat(constraints));
    const newLeft = intersection(left, availableTourItems).concat(newItems);
    const newRight = intersection(constraints, tourItems);
    return (
        !selected ?
            <ChipsArray tourItems={newRight} moveConstraints={makeMoveConstraints(constraints, setConsts)}/> :
            <TransferList left={newLeft} right={newRight} handleAllLeft={handleAllLeft} handleAllRight={handleAllRight}
                          handleCheckedLeft={handleCheckedLeft} handleCheckedRight={handleCheckedRight}/>

    )
}

const makeMoveConstraints = (constraints, setConstraints) => {
    return ({oldIndex, newIndex}) => {
        setConstraints(arrayMove([...constraints], oldIndex, newIndex));
    }
}

export default TourItemsSubset;