import {useEffect, useRef} from "react";
import {v1 as uuidv1} from 'uuid';

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

export const partition = (ary, callback) =>
    ary.reduce((acc, e) => {
        acc[callback(e) ? 0 : 1].push(e)
        return acc
    }, [[], []])

export const uuid = () => {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
}

export const timeorderedUuid = () => {
    return uuidv1().replace(/^(.{8})-(.{4})-(.{4})/, '$3-$2-$1');
}

export const uuidCompare = (a, b) => {
    return a < b ? -1 : (a > b ? 1 : 0);
}

// Hook
export const usePrevious = (value) => {
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