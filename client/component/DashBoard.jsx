import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';
import AddMessage from '../component/AddMessage';


class DashBoard extends React.Component {
  render() {
    return (
      <div>
      <div className='row linkheader'>
     <h3><Link to="/">Sign out</Link></h3>
      </div>
  <Grid data-spy="scroll">
    <Row className="show-grid ">
  <Col xs={12} md={3} className="asidelist">
    <Row className="show-grid create">
      <Col xs={12} md={7} >
        <h3>Groups</h3>
      </Col>
      <Col xs={12} md={5} className="bot">
        <button type="button" className="btn btn-info" data-toggle="collapse"
         data-target="#addgroup">+</button>
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
      <Col xs={12} md={12}  >
      <div>Welcome @ ibrahim</div>
        <div className='one'>
         <h3>Unread Messages</h3>
         <h3>0</h3>
        </div>
        <div className='one'>
          <h3>Read</h3>
          <h3>0</h3>
        </div>
        <div className='one'>
          <h3>Achive</h3>
          <h3>0</h3>
        </div>
      </Col>
      {/* <Col xs={12} md={3} >
        
      </Col> */}
    </Row>
    <div>
    </div>
    
  </Col> 
  
</Row>
</Grid>
</div>
    )
  }
}

export default DashBoard;
