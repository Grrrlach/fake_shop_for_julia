import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default class AdminRoute extends Component {
  render() {
    return this.props.isAdmin ? (
      <ProtectedRoute {...this.props} />
    ) : (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
}
