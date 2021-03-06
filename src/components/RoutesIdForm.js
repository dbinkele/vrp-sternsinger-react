

import React, {useContext, useState} from 'react';
import {RouteIdContext} from "./RouteIdContext";

const SetRoutId = () => {
    const [, setRouteId] = useContext(RouteIdContext);
    const [token, setToken] = useState('')

    const onSubmit = e => {
        e.preventDefault();
        setRouteId(prevVal => token);
    };

    return(
        <form onSubmit={onSubmit}>
            <label htmlFor="Token">Token</label>
            <input type="text" id="name" value={token} onChange={e => setToken(e.target.value)} style={{ width: "500px" }}/>
            <button>submit</button>
        </form>
    );
}

export default SetRoutId;