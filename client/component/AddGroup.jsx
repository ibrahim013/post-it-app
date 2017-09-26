import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Link from 'react-router-dom';
import {Well, Button, Collapse} from 'react-bootstrap';
import Search from '../component/Search';
import  { addGroups, getGroups } from '../actions/GroupAction'

class AddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      groupname: '',
      discription:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit(e) {
    e.preventDefault()
    this.props.addGroups(this.state);
    this.props.getGroups();
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
        
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <input type="text" name="groupname" placeholder="Group Name"
              value={this.state.groupname}
              onChange={this.onChange} required
              />
                  </div>
              <input type="text" name="discription" placeholder="Group Discription"
              value={this.state.discription}
              onChange={this.onChange} required />
               <button name="group" className="btn btn-primary btn-small" 
              onSubmit={this.onSubmit}>
              Create Group
            </button>
          </form>
        
        </div>
    


    );
  }
}
AddGroup.PropTypes ={
  addGroups: PropTypes.func.isRequired,
  getGroups:  PropTypes.func.isRequired
}

export default connect(null, {addGroups, getGroups})(AddGroup);
