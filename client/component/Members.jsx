import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Link from 'react-router-dom';
import {Well, Button, Collapse} from 'react-bootstrap';
import {addMembers} from '../actions/GetGroupsAction'



class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      member: '',
      
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.addMembers(this.state)

  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <input type="text" name="membername" placeholder="Name"
              value={this.state.groupname}
              onChange={this.onChange} required
              />
                  </div>
            <button name="members" className="btn btn-primary btn-small" 
              onSubmit={this.onSubmit}>
              Add Members
            </button>
            
          </form>
          
        </div>
    


    );
  }
}


export default connect(null,{addMembers}) (Members);
