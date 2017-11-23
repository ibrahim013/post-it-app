import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    const { signUpAction } = this.props;
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
};
export default withRouter(connect(null, { signUpAction })(SignUpPage));
