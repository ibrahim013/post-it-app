import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import database from '../../server/database';
import Signin from './signin';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    let user 
    if (!user) {
      <div>
        <ul>
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
        </ul>
      </div>

    }
    else {

      <div>
        <ul>
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign out</a></li>
        </ul>
      </div>


    }
    return (
      <nav id="post" className="navbar navbar-default">
        <div className="container-fluid">
          <div className=" ">
            <a className="navbar-brand" href="#">Post It</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
           
          </ul>

        </div>
        <div>

        </div>
      </nav>
    );
  }
}


export default NavigationBar;