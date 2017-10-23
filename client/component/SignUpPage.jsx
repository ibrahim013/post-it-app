import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Signup from '../component/SignUp';
import { SignUpAction } from '../actions/UserAction';

class SignUpPage extends React.Component {
  render() {
    const { SignUpAction } = this.props;
    return (
      <div className="row ">
        <div>
          <Signup SignUpAction = {SignUpAction} />
        </div>
      </div>
    );
  }
}
SignUpPage.PropTypes = {
  SignUpAction: PropTypes.func.isRequired,
};
export default withRouter(connect(null, { SignUpAction })(SignUpPage));
