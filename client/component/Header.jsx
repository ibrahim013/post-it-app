import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    const loginUser = user.map(user => (
      <span>
        <Avatar size="50" round name={this.props.user[0].displayName} />
        {user.displayName}
      </span>
    ));
    return (
      <Grid bsClass="fluid header">
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h1>POST IT</h1>
          </Col>
          <Col xs={6} md={4}>
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
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
