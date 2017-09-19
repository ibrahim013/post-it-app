import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
<<<<<<< HEAD
=======
import Members from '../component/Members';
>>>>>>> bed8d6a19facf2bed451433e5f26ffd36dfa5d00
import AddMessage from '../component/AddMessage';
import { getGroups, addMembers } from '../actions/GetGroupsAction';
import PropTypes from 'prop-types';

class GroupMessage extends React.Component {
constructor(props){
    super(props);
    this.state = {
        groupName: '',
        groupId: '',
        membername: ''
    }
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
  componentWillMount(){
      const groupid = this.props.match.params.groupid;
      let groupName = "";
      const { Groups } = this.props;
      Groups.map((group, key) => {
        if(group.groupid == groupid){
            this.setState({groupName: group.groupname, groupId: group.groupid,});
            groupName = group.groupname;
        }
        return groupName;
      })

  }
  render() {
    return (
  <Grid data-spy="scroll">
    <Row className="show-grid ">
      <Col xs={12} md={3} className="asidelist">

        <Row className="show-grid create">
          <Col xs={12} md={7} >
            <h3>{this.state.groupName}</h3>
          </Col>

        </Row>
<<<<<<< HEAD
=======

        <div>
          <li>Ibrahim</li>
          <li>Jimoh</li>
          <li>Kene</li>
          <li>Mike</li>
        </div>
>>>>>>> bed8d6a19facf2bed451433e5f26ffd36dfa5d00
      </Col>
      <Col xs={12} md={6}>
        <Row className=" aside">
          <Col xs={12} md={9}  >
            <h1>Messages</h1>
          </Col>
          <Col xs={12} md={3} >
            <button name="signout" className="btn btn-primary btn-small"
              onSubmit={this.onSubmit}>
              Sign out
        </button>
          </Col>
        </Row>
        <div>

          <h3>Message Board is Empty</h3>
        </div>
        <div>
<<<<<<< HEAD
          <AddMessage groupid={this.state.groupId} />
=======
          <AddMessage/>
>>>>>>> bed8d6a19facf2bed451433e5f26ffd36dfa5d00
        </div>
      </Col>
      <Col xs={12} md={3} >
        <Row className="show-grid create">
          <Col xs={12} md={7} >
            <h3>Members</h3>
          </Col>
          <Col xs={12} md={5} className="bot">
            <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#members">+</button>
          </Col>
        </Row>
        <div id="members" className="collapse">
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
        </div>
      </Col>
    </Row>
  </Grid>
)
}
}

GroupMessage.PropTypes = {
    Groups: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      Groups: state.Groups
    }
  }
export default connect(mapStateToProps, { getGroups, addMembers }) (GroupMessage);
