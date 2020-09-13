import React, {useState, createContext} from 'react';

export const TourItemsCtx = createContext('');

export const TourItemProvider = (props) => {
    const [tourItems, setTourItems] = useState([]);

    return <TourItemsCtx.Provider value={[tourItems, setTourItems]}>
        {props.children}
    </TourItemsCtx.Provider>
}