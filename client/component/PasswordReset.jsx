import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { passwordReset } from '../actions/UserAction';

/**
 * 
 * @description Password Reset
 * @export
 * @param {object} props
 * @class PasswordReset
 * @extends {Component}
 */
class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
     * @description Makes an action call to add group
     * route with user parameters
     * @param {object} event
     *
     * @memberof AddGroup
     * 
     * @returns {Promise}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.passwordReset(this.state).then((res) => {
      if (res) {
        this.props.history.push('/');
      }
      this.setState({
        isLoading: false,
        email: '',
      });
    });
  }
  /**
   * @method render
   * Render react component
   * 
   * @memberof AddGroup
   * 
   * @returns {String} HTML markup for password reset
   */
  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <form onSubmit={this.onSubmit}>
          <div className="form-group ps-style">
            <label className="control-label">Password Reset</label>
            <input
              value={this.state.email}
              onChange={this.onChange}
              type="email"
              name="email"
              className="form-control"
              placeholder="enter email"
              required
            />
          </div>
          <div className="form-group">
            <button
              name="login"
              onSubmit={this.onSubmit}
              disabled={this.state.isLoading}
              className="btn btn-primary btn-sm"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PasswordReset.PropTypes = {
  passwordReset: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { passwordReset })(PasswordReset));
