import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMembers } from '../actions/GroupAction';

class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      member: '',
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
    this.props.addMembers(this.state);
    this.setState({
      member: '',
      errors: {},
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="membername"
              placeholder="Name"
              value={this.state.groupname}
              onChange={this.onChange}
              required
            />
          </div>
          <button name="members" className="btn btn-primary btn-small" onSubmit={this.onSubmit}>
            Add Members
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { addMembers })(Members));
