import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import validateInput from '../util/validation';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      password: '',
      email: '',
      errors: {},
      phoneNumber: '',
      isLoading: false,
      isLogedIn: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
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
  onSubmit(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.SignUpAction(this.state).then((res) => {
        this.props.history.push('/');
        if (!res) {
          this.setState({
            isLoading: false,
            isLogedIn: true,
          });
        }
      });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Create Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form onSubmit={this.onSubmit}>
                <div className={classnames('form-group', { 'has-error': errors.displayName })}>
                  <label className="control-label">User Name</label>
                  <input
                    value={this.state.displayName}
                    onChange={this.onChange}
                    type="text"
                    name="displayName"
                    className="form-control"
                    placeholder="eg:ibrahim"
                  />
                  {errors.displayName && <span className="help-block">{errors.displayName}</span>}
                </div>
                <div className={classnames('form-group', { 'has-error': errors.email })}>
                  <label className="control-label">Email</label>
                  <input
                    value={this.state.emaii}
                    onChange={this.onChange}
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="eg:abc@company.com"
                  />
                  {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                <div className={classnames('form-group', { 'has-error': errors.phoneno })}>
                  <label className="control-label">Phone Number</label>
                  <input
                    value={this.state.phoneNumber}
                    onChange={this.onChange}
                    type="tel"
                    pattern="[\+]\d{3}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                    name="phoneNumber"
                    className="form-control"
                    placeholder=" Format: +234(99)9999-9999"
                  />
                  {errors.password && <span className="help-block">{errors.phoneno}</span>}
                </div>
                <div className={classnames('form-group', { 'has-error': errors.password })}>
                  <label className="control-label">Password</label>
                  <input
                    value={this.state.password}
                    onChange={this.onChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="At least 6 Characters"
                  />
                  {errors.password && <span className="help-block">{errors.password}</span>}
                </div>
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
