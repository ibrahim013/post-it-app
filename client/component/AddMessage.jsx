import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addMessage } from '../actions/GroupAction';

class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      piority: '',
      groupname: this.props.groupid,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addMessage(this.state);
  }
  render() {
    return (
      <div>
        <div className="panel-body text">
          <textarea
            className="form-control custom-control "
            placeholder="Messages"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
          />
          <span className="input-group-addon btn btn-primary" onClick={this.onSubmit}>
            Send
          </span>
          <form onSubmit={this.onSubmit}>
            <label className="radio-inline">
              <input
                type="radio"
                name="piority"
                value="normal"
                onChange={this.onChange}
                checked
              />Normal
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="piority"
                value="Critical"
                onChange={this.onChange}
              />Critical
            </label>
            <label className="radio-inline">
              <input type="radio" name="piority" value="urgent" onChange={this.onChange} />Urgent
            </label>
          </form>
        </div>
      </div>
    );
  }
}
AddMessage.PropTypes = {
  Messages: PropTypes.array.isRequired,
};
export default withRouter(connect(null, { addMessage })(AddMessage));
