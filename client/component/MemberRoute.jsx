import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

/**
 * @description High order component fro protected route
 *
 * @function UserRoute
 *
 * @return {string} any
 */
const UserRoute = ({ isAuthenticated, Component: component, ...rest }) => {
  if (!isEmpty(isAuthenticated)) {
    return <Redirect to="/dashboard" />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};
UserRoute.PropTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
function mapStateToProps(state) {
  return {
    isAuthenticated: state.user,
  };
}
export default withRouter(connect(mapStateToProps)(UserRoute));
