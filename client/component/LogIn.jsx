import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleButton from 'react-google-button';
import { HashLoader } from 'react-spinners';
import { signIn } from '../actions/UserAction';
import { googleLogin } from '../actions/GoogleLogin';

/**
 *
 * @description Login user with valid parameters
 * @export
 * @param {object} props
 * @class LogIn
 * @extends {Component}
 */
export class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    * @description Listens for changes in form fileds
    * @memberof AddGroup
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to Google Login
     * route with user parameters
     * @memberof Login
     *
     * @returns {void}
  */
  onHandleSubmit() {
    this.props.googleLogin().then(() => {
      this.props.history.push('/user/update');
    });
  }
  /**
     * @description Makes an action call to Google Login
     * route with user parameters
     * @param {object} event
     *
     * @memberof Login
     *
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.signIn(this.state).then((res) => {
      if (res) {
        this.props.history.push('/dashboard');
      }
      this.setState({
        email: '',
        password: '',
        isLoading: false,
      });
    });
  }
  /**
   * @method render
   * Render react component
   * @memberof Login
   *
   * @returns {String} HTML markup for the Adding user to group
   */
  render() {
    return (
      <div>
        <div className="sweet-loading">
          <HashLoader color={'#ffffff'} loading={this.state.isLoading} />
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="control-label">
                <span className="glyphicon glyphicon-envelope" /> Email
              </label>
              <input
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                name="email"
                className="form-control"
                placeholder="eg ibrahim@gmail.com"
                required
              />
            </div>
            <div className="form-group">
              <label>
                <span className=" control-label glyphicon glyphicon-eye-open" />
                 Password
              </label>
              <input
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                name="password"
                className="form-control"
                placeholder="must be at least 6 character long"
                required
              />
            </div>
            <div className="form-group">
              <button
                disabled={this.state.isLoading}
                name="login"
                onSubmit={this.onSubmit}
                className="btn btn-primary  lgbotton btn-block"
              >
                <span className="glyphicon glyphicon-log-in" /> Login
              </button>
            </div>
          </form>
          <div>
            <GoogleButton
              onClick={() => {
                this.onHandleSubmit();
              }}
              name="goolelogin"
            />
          </div>
          <br />
          <div>
            <span>Dont have an Account? </span>
            <Link to="/signup">Sign up</Link>
          </div>
          <br />
          <div className="modal-footer">
            <Link to="/passwordreset">Password Reset</Link>
          </div>
          <div className=" " />
        </div>
      </div>
    );
  }
}

LogIn.PropTypes = {
  SignIn: PropTypes.func.isRequired,
  GoogleLogin: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { signIn, googleLogin })(LogIn));
