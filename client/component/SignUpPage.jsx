import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Signup from '../component/SignUp';
import { signUpAction } from '../actions/UserAction';

class SignUpPage extends React.Component {
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
