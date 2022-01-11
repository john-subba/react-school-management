import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading },
  ...rest
}) => (
  // here if the isAuthenticated & isLoading both is false then it is forcefully redirected to login page but if both is true then whatever the component props are passed from app.js file where the route is created it is shown.
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !isLoading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
