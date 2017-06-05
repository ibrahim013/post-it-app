import React from 'react';


class App extends React.Component{
	render(){
		return(
		<div>
		<NavigationBar/>
		
		</div>
		);
	}}

class NavigationBar extends React.Component{
	render(){
	return(
<nav className="navbar navbar-inverse navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">POST IT </a>
    </div>
      <ul className="nav navbar-nav navbar-right">
      <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
      <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
    </ul>
  </div>
</nav>
		);
}
}







export default App;
