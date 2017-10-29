import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AddMessage from '../component/AddMessage';
import { getGroups, addMembers, getMessges, getMembers } from '../actions/GroupAction';

const socket = io();

class GroupMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: this.props.match.params.groupid,
      displayName: '',
      error: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    socket.on('message Sent', (data) => {
      console.log(data);
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addMembers(this.state);
  }
  componentDidMount() {
    this.props.getMessges(this.state.groupId);
    this.props.getMembers(this.state.groupId);
    const groupid = this.props.match.params.groupid;
    let groupName = '';
    const { Groups } = this.props;
    Groups.map((group, key) => {
      if (group.groupid === groupid) {
        this.setState({ groupName: group.groupname });
        groupName = group.groupname;
      }
      return groupName;
    });
  }
  render() {
    const { Messages } = this.props;
    const { GroupMembers } = this.props;
    let MessageContainer = '';
    let MemberContainer = '';
    if (Messages.length !== 0) {
      MessageContainer = Messages.map(message => (
        <div key={message.messageId}>
          <div className="panel panel-default">
            <div className="panel-body">
              <p className="">{message.messageText}</p>
              <p id="details">
                <span className="left-align">Sent By: {message.author}</span>
                <span className="left-align">Priority: {message.priorityLevel}</span>
                <span className="right-align">: {message.date}</span>
              </p>
            </div>
          </div>
        </div>
      ));
    } else {
      MessageContainer = <h2>You have no message on this board<br/> be the first to say something</h2>;
    }
    if (GroupMembers.length !== 0) {
      MemberContainer = GroupMembers.map(member => (
        <li key={member.memberId}>
          <span className="glyphicon glyphicon-user" /> &nbsp;&nbsp;
          {member.displayName}
        </li>
      ));
    } else {
      MemberContainer = 'no member added yet';
    }
    return (
      <div>
        <Grid data-spy="scroll">
          <Row className="show-grid ">
            <Col xs={12} md={3} className="asidelist">
              <div id="signin">
                <h3>
                  <Link to="/dashboard">Dashboard</Link>
                </h3>
              </div>
              <Row className="show-grid create">
                <Col xs={12} md={12}>
                  <h3>{this.state.groupName}</h3>
                  <li>{MemberContainer}</li>
                </Col>
              </Row>
              <div>
                <Col xs={12} md={12} bsClass="member'">
                  <Row className="show-grid  ">
                    <Col xs={12} md={6}>
                      <h3>Members</h3>
                    </Col>
                    <Col xs={12} md={4} className="bot">
                      <button
                        type="button"
                        className="btn btn-info"
                        data-toggle="collapse"
                        data-target="#members"
                      >
                        +
                      </button>
                    </Col>
                  </Row>
                  <div id="members" className="collapse">
                    <div>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="displayName"
                            placeholder="Name"
                            value={this.state.displayName}
                            onChange={this.onChange}
                            required
                          />
                        </div>
                        <button
                          name="members"
                          className="btn btn-primary btn-small"
                          onSubmit={this.onSubmit}
                        >
                          Add Members
                        </button>
                      </form>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
            <Col xs={12} md={9} className="messagelist">
              <div className="messageboard ">
                <div className="">{MessageContainer}</div>
              </div>

              <div className="post">
                <AddMessage groupid={this.state.groupId} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

GroupMessage.PropTypes = {
  Groups: PropTypes.array.isRequired,
  Messages: PropTypes.array.isRequired,
  GroupMembers: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
  return {
    Groups: state.Groups,
    Messages: state.Messages,
    GroupMembers: state.groupMembers,
  };
}
export default withRouter(
  connect(mapStateToProps, { getGroups, addMembers, getMessges, getMembers })(GroupMessage),
);
