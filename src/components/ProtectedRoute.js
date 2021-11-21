import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

class Protectedroute extends Component {
    render() {
        return this.props.token ?(
            this.props.children
        ):(
            <Navigate to={{pathname:"/login"}} />
        );
    }
}

export default Protectedroute;
