import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, loggedIn }) => (
  <Route
    render={(props) =>
      loggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default ProtectedRoute;
