import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AddMessage from '../component/AddMessage';
import { getGroups, addNewMember,
getAllMessages, getMembers } from '../actions/GroupAction';
import Navigation from './Navigation';


/**
 * @description add user and post group message
 *
 * @export
 * @param {object} props
 * @class GroupMessage
 * @extends {Component}
 */
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
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to add  members to group
     * route with state parameter
     *
     * @param {object} event
     * @memberof AddGroup
     *
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.addNewMember(this.state);
    this.setState({
      displayName: '',
      errors: {},
    });
  }
  componentDidMount() {
    this.props.getGroups();
    this.props.getAllMessages(this.state.groupId);
    this.props.getMembers(this.state.groupId);
    const groupid = this.props.match.params.groupid;
    let groupName = '';
    const { Groups } = this.props;
    Groups.map((group) => {
      if (group.groupid === groupid) {
        groupName = group.groupname;
      }
      return groupName;
    });
  }
  /**
   * @method render
   * Render react component
   *
   * @memberof AddGroup
   *
   * @returns {String} HTML markup for displaying board message
   */
  render() {
    const { Messages, GroupMembers, Read, Groups } = this.props;
    let MessageContainer = '';
    let MemberContainer = '';
    let readContainer = '';
    let groupName = '';
    if (!Groups) {
      return <h3>Loading...</h3>;
    }
    Groups.map((group) => {
      if (group.groupid === this.props.match.params.groupid) {
        groupName = group.groupname;
      }
      return groupName;
    });
    if (Messages.length !== 0) {
      MessageContainer = Messages.map(message => (
        <div key={message.messageId}>
          <div className="panel panel-default">
            <div className="panel-body">
              <p className="">{message.messageText}</p>
              <p id="details">
                <span className="left-align">Sent By: {message.author}
                </span>&nbsp;
                <span className="left-align">Priority: {message.priorityLevel}
                </span>&nbsp;
                <span className="right-align">Sent On: {message.date}</span>
              </p>
            </div>
            {readContainer}
          </div>
        </div>
      ));
    } else {
      MessageContainer = (
        <h2>
          You have no message on this board<br /> be the first to say something
        </h2>
      );
    }
    if (GroupMembers.length !== 0) {
      MemberContainer = GroupMembers.map(member => (
        <li key={member.memberId} id="ingroup">
          <span className="glyphicon glyphicon-user" /> &nbsp;&nbsp;
          {member.displayName}
        </li>
      ));
    } else {
      MemberContainer = 'no member added yet';
    }
    if (Read.length !== 0) {
      readContainer = Read.map(seen => (
          <li key={1}>
            <span className="glyphicon glyphicon-user" /> &nbsp;&nbsp;
            {seen.displayName}
          </li>
      ));
    }
  /**
   * @memberof GroupMessage
   *
   *  @return {jsx} rendered jsx element
   */
    return (
      <div>
        <Grid data-spy="scroll">
          <Row className="show-grid wrapper">
            <Col xs={12} md={2} className="asidelist sidebar">
              <Row className="show-grid create">
                <Col xs={12} className="dnav">
                <ul className="sidelist">
                  <Navigation />
                </ul>
                </Col>
                <Col xs={12} className="">
                  <h3> {groupName}</h3>
                  {MemberContainer}
                </Col>
              </Row>
              <div>
                <Col xs={12} md={12} bsClass="member'">
                  <Row className="show-grid  ">
                    <Col xs={8} md={7} id="member">
                      <h3>Members</h3>
                    </Col>
                    <Col xs={3} md={4} className="bot">
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
            <Col xs={10} md={8} className="messagelist">
              <div className="messageboard ">
                <div className="">{MessageContainer}</div>
              </div>
              <div className="post">
                <AddMessage groupId={this.state.groupId}
                groupName={groupName} />
              </div>
            </Col>
            <Col xs={4} md={2}>
              <div className="seenboard ">
                <p>Seen By</p>
                <div className="">{readContainer}</div>
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
  Read: PropTypes.array.isRequired,
  Messages: PropTypes.array.isRequired,
  GroupMembers: PropTypes.array.isRequired,
};
/**
   * connect to redux store
   * @param {any} user
   */
function mapStateToProps(state) {
  return {
    Groups: state.groups,
    Read: state.read,
    Messages: state.messages,
    GroupMembers: state.groupMembers,
  };
}
export default withRouter(
  connect(mapStateToProps, {
    getGroups,
    addNewMember,
    getAllMessages,
    getMembers,
  })(GroupMessage),
);
