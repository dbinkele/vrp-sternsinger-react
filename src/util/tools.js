

export const url = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000/'
    }
    if (process.env.NODE_ENV === 'production') {
        return 'https://mighty-cliffs-46044.herokuapp.com/'
    }
}