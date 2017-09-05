import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from '../actions/LogInAction';


// import{ userSigninRequest } from '../actions/usersignupAction';
// import PasswordReset from '../component/passwordreset'
// import { browserHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';
// import { googleLogin } from '../actions/googlelogin';

class LogIn extends React.Component {
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
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.SignIn(this.state)
      .then(
        () => {
          history.pushState(null, null, '/dashboard'); window.location.reload();
        }
        // (err) => this.setState({ errors: err.response.data,
        //   isLoading: false }));
      )}
  render() {
    const { errors } = this.state;


    return (
      <div className="row col-md-10 col-md-offset-1">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="control-label">Email</label>
            <input value={this.state.email} onChange={this.onChange}
              type="email" name="email" className="form-control"
              placeholder="eg ibrahim@gmail.com" />

          </div>
          <div className="form-group">
            <label className="control-label">Password</label>
            <input value={this.state.password} onChange={this.onChange}
              type="password" name="password" className="form-control"
              placeholder="must be at least 6 character long" />

          </div>

          <div className="form-group">
            <button disabled={this.state.isLoading} name="login"
              onSubmit={this.onSubmit}
              className="btn btn-primary btn-lg lgbotton">
              <span className="glyphicon glyphicon-log-in" /> Login
            </button>
          </div>

        </form>
        <div>
          <GoogleButton
            onClick={() => { googleLogin(); }}
          />
        </div>
        <br />
        <div>
          <span>Dont have an Account? </span><Link to="/signup">Sign up</Link>
        </div>
        <br />
        <div className=" " >
          <Link to="/passwordreset" >Password Reset</Link>
        </div>
      </div>
    );
  }
}

LogIn.PropTypes = {
  SignIn: PropTypes.func.isRequired
};
export default connect(null, { SignIn })(LogIn);
