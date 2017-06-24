import React from 'react';
import '../css/index.css';
import {Link} from 'react-router';


class NavigationBar extends React.Component{
	render(){
	return(
<nav className="navbar navbar-inverse fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">POST IT </a>
    </div>
  
    </div>
</nav>
		);
}
}
export default NavigationBar;