import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';


class Logout extends Component {

    componentDidMount(){this.props.setToken('')}

    render() {
        return (
            <div>
                <Navigate to={{pathname : '/login'}} />
            </div>
        );
    }
}

export default Logout;
