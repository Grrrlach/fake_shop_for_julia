import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

class Protectedroute extends Component {
    render() {
        return this.props.token ?(
            this.props.children
        ):(
            <Redirect to={{pathname:"/login"}} />
        );
    }
}

export default Protectedroute;
