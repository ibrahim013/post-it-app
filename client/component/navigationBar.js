import React from 'react';
import '../css/index.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import database from '../../server/database';



class NavigationBar extends React.Component{
	render(){
    
	return(
<nav className="navbar navbar-inverse">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">Post It</a>
    </div>
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
    <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Log Out</a></li>
    </ul>
  </div>
<div>

</div>
</nav>
		);
}
}

export default NavigationBar;