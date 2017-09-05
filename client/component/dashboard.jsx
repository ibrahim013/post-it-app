import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import AddGroup from '../component/AddGroup';

const DashBoard = React.createClass({
   getInitialState() {
    return { show: false };
  },

  showModal() {
    this.setState({ show: true });
  },

  hideModal() {
    this.setState({ show: false });
  },
render() {
return (
<Grid>
  <Row className="show-grid ">
      <Col xs={12} md={3} className=" aside">
      <row >
         <ButtonToolbar>
         <span>Create Group</span> <p><Button bsStyle="primary" onClick={this.showModal} bsSize="large">
          +
          </Button>
          </p>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <AddGroup/>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>

      </row>
      </Col>
    <Col xs={12} md={6}><MessageList/></Col>
    <Col xs={12} md={3} className=" aside">this is three</Col>
    </Row>
  </Grid>
);
}
});
export default DashBoard;
