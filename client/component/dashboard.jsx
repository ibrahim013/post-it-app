import React from 'react';
import Addgroup from '../component/addgroup';
import {addGroupAction} from '../actions/usersignupAction';
import MessageList from '../component/messagelist';
  


class dashboard extends React.Component{

render(){
	
return(
	<div>
	<div className="row col-sm-4 ">
	<div className="panel panel-default ">
	 <div className="panel-heading">Groups
	  
	<ul id="sidebar" className="nav nav-pills nav-stacked" >
    <li><a href="#"><span className="glyphicon glyphicon-user"></span>  Profile</a></li>
    <li><a href="#"><span className="glyphicon glyphicon-lock"></span>  Access</a></li>
    <li><a href="#"><span className="glyphicon glyphicon-envelope"></span>  Message</a></li>
    <li><a href="#"><span className="glyphicon glyphicon-list"></span>  Notifications</a></li>
    <li><a href="#"><span className="glyphicon glyphicon-comment"></span>  Chat</a></li>
    </ul>
	  </div>
		<div className="panel-body ">
	  <Addgroup/>
	  {addGroupAction}
	  <div>
	  </div>
	 
	 </div>
	 </div>
	 </div>
	<div className="row col-sm-3 col-sm-offset-1">
	<div className="panel panel-default ">
	 <div className="panel-heading" > <MessageList />
	 </div>
	 </div>
	 </div>  
	 <div className="row col-sm-4">
	<div className="panel panel-default ">
	 <div className="panel-heading">Messages
	 </div>

	 </div>
	 </div>
	
	</div>
);
}
}


export default dashboard;
