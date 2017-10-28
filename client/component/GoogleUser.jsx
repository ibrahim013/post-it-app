import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleUpdate } from '../actions/GoogleLogin';

class GooglePhoneVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.GoogleUpdate(this.state);
  }
  render() {
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
                pattern="[\+]\d{3}[\(]\d{2}[\)]\d{4}[\-]\d{4}"
                name="phoneNumber"
                className="form-control"
                placeholder=" Format: +234(99)9999-9999"
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
export default withRouter(connect(null, { GoogleUpdate })(GooglePhoneVerification));
