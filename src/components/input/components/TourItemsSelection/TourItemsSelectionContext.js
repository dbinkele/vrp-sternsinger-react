import React, {useState, createContext} from 'react';

export const TourItemsSelectionContext = createContext('');

export const TourItemProvider = (props) => {
    const [tourItems, setTourItems] = useState([
        // { key: 0, label: 'Angular' },
        // { key: 1, label: 'jQuery' },
        // { key: 2, label: 'Polymer' },
        // { key: 3, label: 'React' },
        // { key: 4, label: 'Vue.js' },
    ]);

    return <TourItemsSelectionContext.Provider value={[tourItems, setTourItems]}>
        {props.children}
    </TourItemsSelectionContext.Provider>
}