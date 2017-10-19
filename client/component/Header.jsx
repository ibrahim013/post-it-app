import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    const loginUser = user.map(user => {
      return <h3>Welcome @{user.displayName}</h3>;
    });
    return (
      <Grid bsClass="fluid header">
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h1>POST IT</h1>
          </Col>
          <Col xs={6} md={4}>
            <h2 id="user">{loginUser}</h2>
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

export default connect(mapStateToProps)(Header);
