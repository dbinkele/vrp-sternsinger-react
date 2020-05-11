import React from 'react';


class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(this.url() + "/time")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    url() {
        if (process.env.NODE_ENV === 'development') {
            return 'http://localhost:5000'
        }
        if (process.env.NODE_ENV === 'production') {
            return 'https://mighty-cliffs-46044.herokuapp.com'
        }
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            {item.name} {item.price} {process.env.REACT_APP_NOT_SECRET_CODE}
                        </li>
                    ))}
                </ul>
            );
        }
    }
}

export default MyComponent