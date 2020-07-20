import {useEffect, useRef} from "react";


export const url = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000/'
    }
    if (process.env.NODE_ENV === 'production') {
        return 'https://mighty-cliffs-46044.herokuapp.com/'
    }
}


// diff between just two arrays:
export const arrayDiff = (a, b) => {
    return [
        ...a.filter(x => !b.includes(x)),
        ...b.filter(x => !a.includes(x))
    ];
}

export const uuid = () => {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
}

// Hook
export function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}