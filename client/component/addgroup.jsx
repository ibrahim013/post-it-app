import React from 'react';
// import addGroupAction from '../actions/AddGroupAction';
import validateInput from '../util/validation';
import axios from 'axios';
import classnames from 'classnames';
import Link from 'react-router-dom';
import {Well, Button, Collapse} from 'react-bootstrap';
import Search from '../component/Search';

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
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault()
     if(this.isValid()){
       this.setState({errors})
    axios.post('/group', { groupname: this.state.groupname, discription:this.state.discription })
  }
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <div className="row addgroup">
          <form onSubmit={this.onSubmit}>
            <div className={classnames('form-group',
                  { 'has-error': errors.groupname })}>
            <input type="text" name="groupname" placeholder="Group Name"
              value={this.state.groupname}
              onChange={this.onChange} 
              />
                  </div>
              <input type="text" name="discription" placeholder="Group Discription"
              value={this.state.discription}
              onChange={this.onChange} />
            <button name="group" className="btn btn-primary btn-small"
              onSubmit={this.onSubmit}>
              Create Group
            </button>
          </form>
          <button name="group" className="btn btn-primary btn-small"
              onClick={ ()=> this.setState({ open: !this.state.open })}>
              AddGroup Members
            </button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
            <Search/>
            </Well>
          </div>
        </Collapse>
        
        </div>
      </div>


    );
  }
}

export default AddGroup;