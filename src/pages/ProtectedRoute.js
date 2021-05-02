import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                  msg: "You must be logged in to view this page!",
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default withRouter(ProtectedRoute);
