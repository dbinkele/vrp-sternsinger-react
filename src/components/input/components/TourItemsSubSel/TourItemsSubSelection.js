import React, {useContext} from 'react';

import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const TourItemSubSelection = ({state}) => {

    return (
        <Select options={options} />
        // <Select
        //     isMulti={true}
        //     name="tourItemsSubSelect"
        //     options={state}
        //     className="basic-multi-select"
        //     classNamePrefix="select"
        // />
        )
}
export default TourItemSubSelection;