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
      errors: {},
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
    this.setState({
      message: '',
      piority: '',
    });
  }
  render() {
    return (
      <div className="panel-body text">
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control custom-control"
            placeholder="Messages"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
            required
          />
          <label className="radio-inline btn-space">
            <input type="radio" name="piority" value="Normal" onChange={this.onChange} />Normal
          </label>
          <label className="radio-inline btn-space">
            <input type="radio" name="piority" value="Critical" onChange={this.onChange} />Critical
          </label>
          <label className="radio-inline btn-space">
            <input type="radio" name="piority" value="Urgent" onChange={this.onChange} />Urgent
          </label>
          <span className="input-group-addon btn btn-primary " onClick={this.onSubmit}>
            Send <span className=" glyphicon glyphicon-send" />
          </span>
        </form>
      </div>
    );
  }
}
AddMessage.PropTypes = {
  Messages: PropTypes.array.isRequired,
};
export default withRouter(connect(null, { addMessage })(AddMessage));
