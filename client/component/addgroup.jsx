import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import database from '../../server/database';
// import firebase from 'firebase';
// import { addGroup } from '../actions/AddGroupAction';


export class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      groupname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.addGroup(this.state);
  }
componentDidMount() {
  this.props.getAllGroups();
}
  render() {
    return (
      <div>
        <div className="row addgroup">
          <form onSubmit={this.onSubmit}>
            <input type="text" name="groupname" placeholder="Group Name"
              value={this.state.groupname}
              onChange={this.onChange} />
            <button name="group" className="btn btn-primary btn-small"
              onSubmit={this.onSubmit}>
              +
            </button>
          </form>
        </div>
      </div>


    );
  }
}
// AddGroup.PropTypes = {
//   addGroup: PropTypes.func.isRequired,
// };

