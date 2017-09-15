import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import MessageList from '../component/MessageList';
import { Jumbotron, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import AddGroup from '../component/AddGroup';
import GetGroupList from '../component/GetGroupList';

class DashBoard extends React.Component{
  render() {
    return (
      <Grid>
        <Row className="show-grid ">
          <Col xs={12} md={3} className="asidelist">
      
              <Row className="show-grid create">
               <Col xs={12} md={7} >
               <h3>Groups</h3>
              </Col>
              <Col xs={12} md={5} className="bot">
              <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#demo">+</button>
               </Col>
              </Row>
             
                <div id="demo" className="collapse">
                  <AddGroup/>
              </div>
              <div>
                <GetGroupList/>
              </div>
            
          </Col>
           <Col xs={12} md={6}></Col> 
          <Col xs={12} md={3} className=" aside">
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DashBoard;
