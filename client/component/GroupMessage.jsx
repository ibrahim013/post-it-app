import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import MessageList from '../component/MessageList';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import AddMessage from '../component/AddMessage';
import { getGroups, addMembers, getMessges } from '../actions/GroupAction';

class GroupMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupId: '',
      displayName: '',
      error: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props
      .addMembers(this.state)
      .then(response => {
        Alert.success(response.data.message, {
          position: 'top-right',
          offset: 100,
        });
      })
      .catch(err => {
        if (err.response) {
          Alert.error(err.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
      });
  }
  componentDidMount() {
    const groupid = this.props.match.params.groupid;
    let groupName = '';
    const { Groups } = this.props;
    Groups.map((group, key) => {
      if (group.groupid == groupid) {
        this.setState({ groupName: group.groupname, groupId: group.groupid });
        groupName = group.groupname;
      }
      return groupName;
    });

    this.props.getMessges(groupid);
  }
  render() {
    const { Messages } = this.props;
    let MessageContainer = '';
    if (Messages) {
      MessageContainer = Messages.map(message => {
        return (
          <div key={message.messageId}>
            <div className="messageRow">
              <p>
                <span className="left-align">Sent By: {message.author}</span>
                <span className="left-align">Priority: {message.priorityLevel}</span>
                <span className="right-align">: {message.date}</span>
              </p>
              <p className="">{message.messageText}</p>
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="row linkheader">
          <h3>
            <Link to="/">Sign out</Link>|<Link to="/dashboard">Dashboard</Link>
          </h3>
        </div>
        <Grid data-spy="scroll">
          <Row className="show-grid ">
            <Col xs={12} md={3} className="asidelist">
              <Row className="show-grid create">
                <Col xs={12} md={7}>
                  <h3>{this.state.groupName}</h3>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6}>
              <Row className=" aside">
                <Col xs={12} md={9}>
                  <h3>Message Board</h3>
                </Col>
                <Col xs={12} md={3} />
              </Row>
              <div>
                <div className="panel panel-default ">
                  <div className="panel-heading">{MessageContainer}</div>
                </div>
              </div>
              <div className="">
                <AddMessage groupid={this.state.groupId} />
              </div>
            </Col>
            <Col xs={12} md={3}>
              <Row className="show-grid create">
                <Col xs={12} md={7}>
                  <h3>Members</h3>
                </Col>
                <Col xs={12} md={5} className="bot">
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
          </Row>
        </Grid>
      </div>
    );
  }
}

GroupMessage.PropTypes = {
  Groups: PropTypes.array.isRequired,
  Messages: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
  return {
    Groups: state.Groups,
    Messages: state.Messages,
  };
}
export default connect(mapStateToProps, { getGroups, addMembers, getMessges })(GroupMessage);
