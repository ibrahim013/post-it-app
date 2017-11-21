import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { googleUpdate } from '../actions/GoogleLogin';

/**
 *
 * @description verifying if user signing wit google has phone number verified
 * @export
 * @param {object} props
 * @class GooglePhoneVerification
 * @extends {Component}
 */
export class GooglePhoneVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    * @description Listens for changes in form fileds
    * @memberof GooglePhoneVerification
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to GoogleUpdate
     * route with user parameters
     * @param {object} event
     *
     * @memberof GooglePhoneVerification
     *
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.googleUpdate(this.state);
  }
  /**
   * @method render
   * Render react component
   *
   * @memberof GooglePhoneVerification
   *
   * @returns {String} HTML markup for the Adding user to group
   */
  render() {
    const { isConfirmed } = this.props;
    if (isConfirmed) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="row">
        <div className="col-md-4 col-sm-offset-4  blogin">
          <div className="ubdate">Update Phone Number To Proceed</div>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="control-label">Phone Number</label>
              <input
                disabled={this.state.isLoading}
                value={this.state.phoneNumber}
                onChange={this.onChange}
                type="tel"
                pattern="\d{3}\d{2}\d{4}\d{4}"
                name="phoneNumber"
                className="form-control"
                placeholder=" Format: 2349999999999"
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
                <span className="glyphicon glyphicon-edit" /> Update
              </button>
            </div>
          </form>
          <div />
        </div>
      </div>
    );
  }
}
GooglePhoneVerification.PropType = {
  isConfirmed: PropTypes.bool.isRequired,
};
/**
   * connect to redux store
   * @param {boolen} isConfirmed
   */
function mapStateToProps(state) {
  return {
    isConfirmed: state.googleLogin[0],
  };
}
export default withRouter(connect(mapStateToProps,
  { googleUpdate })(GooglePhoneVerification));
