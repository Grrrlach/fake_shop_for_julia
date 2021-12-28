import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';


class Logout extends Component {

    componentDidMount(){this.props.setToken('')}

    render() {
        return (
            <div>
                <Redirect to={{pathname : '/login'}} />
            </div>
        );
    }
}

export default Logout;
