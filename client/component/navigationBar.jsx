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
    return (
      <nav id="post" className="navbar navbar-default">
        <div className="container-fluid">
          <div className=" ">
            <a className="navbar-brand" href="#"></a>
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