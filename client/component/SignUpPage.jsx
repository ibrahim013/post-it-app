import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Signup from '../component/SignUp';
import { signUpAction } from '../actions/UserAction';

 /**
 * @description user signup connected component
 *
 * @export
 *
 * @param {object} props
 *
 * @class SignUp
 *
 * @extends {Component}
 */
class SignUpPage extends React.Component {
  /**
   * @method render
   *
   * @description Render react component
   *
   * @memberof SignUpPage
   *
   * @returns {String} HTML markup for the signup page
   */
  render() {
    const { signUpAction, isAuthenticated } = this.props;
    if (!isEmpty(isAuthenticated)) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="row ">
        <div>
          <Signup signUpAction={signUpAction} />
        </div>
      </div>
    );
  }
}
SignUpPage.PropTypes = {
  signUpAction: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
   * connect to redux store
   * @param {boolen} isConfirmed
   */
function mapStateToProps(state) {
  return {
    isAuthenticated: state.user,
  };
}
export default withRouter(connect(mapStateToProps, { signUpAction })(SignUpPage));
