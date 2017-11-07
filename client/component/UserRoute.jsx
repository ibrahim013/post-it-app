import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

/**
 *
 * @description High oder component for protected route
 * @export
 *
 */
const UserRoute = ({ isAuthenticated, Component: component, ...rest }) => {
  if (!isEmpty(isAuthenticated)) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/" />;
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
