import {v1 as uuidv1} from 'uuid';

export const url = () => {
    console.log("NODE_ENV " + process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
        let url = window.location.origin.toString() + "/";
        console.log("Url " + url);
        return url
    }
    return 'http://localhost:80/'
}

export function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
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


export const round = (num, dec) => {

    if ((typeof num !== 'number') || (typeof dec !== 'number'))
        return false;

    var num_sign = num >= 0 ? 1 : -1;

    return (Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec);
}
