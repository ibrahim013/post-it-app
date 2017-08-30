import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Signup from '../component/SignUp';
import SignUpAction from '../actions/SignUpAction';
import addFlashMessage from '../actions/AddFlashMessage';


class SignUpPage extends React.Component {
  render() {
    const { SignUpAction, addFlashMessage } = this.props;
    return (
      <div className="row ">
        <div>
          <Signup SignUpAction = {SignUpAction} addFlashMessage = {addFlashMessage}/>
        </div>
      </div>
    );
  }
}
SignUpPage.PropTypes = {
  SignUpAction: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};
export default connect(null, { SignUpAction, addFlashMessage })(SignUpPage);
