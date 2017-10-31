import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

/**
 * 
 * @description display app header with login user
 * @export
 * @class Header
 * @extends {Component}
 */
class Header extends React.Component {
  /**
   * @method render
   * Render react component
   * 
   * @memberof render
   * 
   * @returns {String} HTML markup for the header
   */
  render() {
    const { user } = this.props;
    const loginUser = user.map(user => (
      <span>
        <Avatar size="50" round name={this.props.user[0].displayName} /> &nbsp;&nbsp;
        {user.displayName}
      </span>
    ));
    return (
      <Grid bsClass="fluid header">
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h1>POST IT</h1>
          </Col>
          <Col xs={6} md={3} mdOffset={1}>
            <div id="user">{loginUser}</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
Header.PropTypes = {
  user: PropTypes.object.isRequired,
};
/**
   * connect to redux store
   * @param {any} user
   */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
