import React, {useState, createContext} from 'react';

export const RouteIdContext = createContext('');


export const RouteIdProvider = (props) => {
    const [routeId, setRouteId] = useState('No Value yet');

    return <RouteIdContext.Provider value={[routeId, setRouteId]}>
        {props.children}
    </RouteIdContext.Provider>
}