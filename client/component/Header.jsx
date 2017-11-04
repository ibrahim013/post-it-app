import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { Grid, Row, Col } from 'react-bootstrap';
import { SignOut } from '../actions/UserAction';

const socket = io();
/**
 * 
 * @description display app header with login user
 * @export
 * @class Header
 * @extends {Component}
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
     * @description Makes an action call to signout route 
     * @memberof AddGroup
     * 
     * @returns {void}
  */
  onSubmit() {
    this.props.SignOut();
    this.props.history.push('/');
  }
  componentDidMount() {
    socket.on('message Sent', data => this.setState({ notification: data }));
  }
  /**
   * @method render
   * Render react component
   * 
   * @memberof render
   * 
   * @returns {String} HTML markup for the header
   */
  render() {
    const { user, isAuthenticated } = this.props;
    const loginUser = user.map(user => (
      <span>
        <Avatar size="35" round name={this.props.user[0].displayName} /> &nbsp;&nbsp;
        {user.displayName}
      </span>
    ));
    return (
      <Grid bsClass="fluid header">
        <Row className="show-grid">
          <Col xs={10} md={8}>
            <h3>POST IT</h3>
          </Col>
          <Col xs={12} md={4}>
            <div id="user" />
            <ul class="nav navbar-nav navbar-right">
              <li>{loginUser}</li>
              <li>
                <div>
                  {isEmpty(isAuthenticated) ? (
                    <div />
                  ) : (
                    <button onClick={() => {
                      this.onSubmit();
                    }} className="signout">Signout</button>
                  )}
                </div>
              </li>
            </ul>
          </Col>
        </Row>
      </Grid>
    );
  }
}
Header.PropTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
   * connect to redux store
   * @param {any} user
   */
function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: state.user,
  };
}

export default withRouter(connect(mapStateToProps, { SignOut })(Header));
