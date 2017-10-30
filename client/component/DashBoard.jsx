import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import dateTime from 'date-time';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import { SignOut } from '../actions/UserAction';
import GoogleUser from './GoogleUser';

const socket = io();

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.SignOut();
    this.props.history.push('/');
  }
  render() {
    const { isConfirmed } = this.props;
    if (isConfirmed === false) {
      return <GoogleUser />;
    }
    return (
      <div>
        <div className="row linkheader" />
        <Grid data-spy="scroll">
          <Row className="show-grid ">
            <Col xs={12} md={3} className="asidelist">
              <Row className="show-grid create-group">
                <div id="signout">
                  <h3>
                    <button
                      onClick={() => {
                        this.onSubmit();
                      }}
                    >
                      Sign out
                    </button>
                  </h3>
                </div>
                <Col xs={12} md={7}>
                  <div>
                    <h3>Groups</h3>
                  </div>
                </Col>
                <Col xs={12} md={5} className="bot">
                  <button
                    type="button"
                    className="btn btn-info"
                    data-toggle="collapse"
                    data-target="#addgroup"
                  >
                    +
                  </button>
                </Col>
              </Row>

              <div id="addgroup" className="collapse">
                <AddGroup />
              </div>
              <div>
                <GetGroupList />
              </div>
            </Col>
            <Col xs={12} md={9}>
              <Row className=" ">
                <Col xs={12} md={12}>
                  <div> </div>
                  <div className="one">
                    <div className="" />
                    <h3>Today</h3>
                    <h3>{dateTime()}</h3>
                  </div>
                </Col>
              </Row>
              <div />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
DashBoard.PropType = {
  isConfirmed: PropTypes.bool.isRequired,
};
function mapStateToProps(state) {
  return {
    isConfirmed: state.GoogleLogin,
  };
}

export default withRouter(connect(mapStateToProps, { SignOut })(DashBoard));
