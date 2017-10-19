import React from 'react';
import Link from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Well, Button, Collapse } from 'react-bootstrap';
import { addGroups } from '../actions/GroupAction';

class AddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      groupname: '',
      discription: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.addGroups(this.state);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="groupname"
              placeholder="Group Name"
              value={this.state.groupname}
              onChange={this.onChange}
              required
            />
          </div>
          <input
            type="text"
            name="discription"
            placeholder="Group Discription"
            value={this.state.discription}
            onChange={this.onChange}
            required
          />
          <button name="group" className="btn btn-primary btn-small" onSubmit={this.onSubmit}>
            Create Group
          </button>
        </form>
      </div>
    );
  }
}
AddGroup.PropTypes = {
  addGroups: PropTypes.func.isRequired,
};

export default connect(null, { addGroups })(AddGroup);
