import React from 'react';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import LogIn from '../component/LogIn';

const HomePage = React.createClass({
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
      <ButtonToolbar>
        <Jumbotron className="home">
          <h1>When it Comes to Messaging...</h1>
          <h2>We Got You Covered</h2>
          <p><Button bsStyle="primary" onClick={this.showModal} bsSize="large">
          Get Started
          </Button>
          </p>
        </Jumbotron>
        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <LogIn />
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>

    );
  },
});
export default HomePage;
