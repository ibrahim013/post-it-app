import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Link from 'react-router-dom';
import {Well, Button, Collapse} from 'react-bootstrap';
import Search from '../component/Search';
import  { addGroups }  from '../actions/GetGroupsAction'

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
    this.props.addGroups(this.state)

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
          <button name="group" className="btn btn-primary btn-small"
              onClick={ ()=> this.setState({ open: !this.state.open })}>
               Members
            </button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            <Search/>
            </Well>
          </div>
        </Collapse>
        
        </div>
    


    );
  }
}
AddGroup.PropTypes ={
  addGroups: PropTypes.func.isRequired
}

export default connect(null, {addGroups})(AddGroup);