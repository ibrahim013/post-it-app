import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { Modal } from 'react-bootstrap';
import TextFieldGroup from '../component/common/TextFieldGroup';
import validateInput from '../utilities/validation';

/**
 * @description user signup component
 *
 * @export
 *
 * @param {object} props
 *
 * @class SignUp
 *
 * @extends {Component}
 */
export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      password: '',
      email: '',
      errors: {},
      phoneNumber: '',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    *
    * @description Listens for changes in form fileds
    *
    * @memberof SignUp
    *
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
     * @description Makes an action call to signup
     * route with user parameters
     *
     * @param {object} event
     *
     * @memberof SignUp
     *
     * @returns {Promise}
  */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.signUpAction(this.state).then((res) => {
        if (res) {
          this.props.history.push('/');
        }
        if (!res) {
          this.setState({
            email: '',
            isLoading: false,
          });
        }
      });
    }
  }
  /**
   * @method render
   *
   * @description Render react component
   *
   * @memberof SignUp
   *
   * @returns {String} HTML markup for the signup page
   */
  render() {
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="sweet-loading">
                <HashLoader color={'#ffffff'} loading={this.state.isLoading} />
              </div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  value={this.state.displayName}
                  onChange={this.onChange}
                  name="displayName"
                  field="displayName"
                  label="Username"
                  placeholder="eg:ibrahim"
                />
                <TextFieldGroup
                  value={this.state.emaii}
                  onChange={this.onChange}
                  name="email"
                  label="Email"
                  field="email"
                  placeholder="eg:abc@company.com"
                />
                <TextFieldGroup
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  field="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  pattern="\d{3}\d{2}\d{4}\d{4}"
                  label="Phone Number"
                  placeholder=" Format: 2349999999999"
                />
                <TextFieldGroup
                  value={this.state.password}
                  onChange={this.onChange}
                  field="password"
                  label="Password"
                  type="password"
                  placeholder="At least 6 Characters"
                />
                <div className="form-group">
                  <button
                    disabled={this.state.isLoading}
                    name="login"
                    className="btn btn-primary lgbotton col-md-offset-4-7"
                  >
                    <span className="glyphicon glyphicon-user" /> Signup
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div id="account">
              <h3>
                Have an Account <Link to="/">Log In </Link>
              </h3>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

SignUp.PropTypes = {
  SignUpAction: PropTypes.func.isRequired,
};

export default withRouter(SignUp);
