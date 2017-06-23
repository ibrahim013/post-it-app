import React from 'react';
import Addgroup from '../component/addgroup';
import {addGroupAction} from '../actions/usersignupAction';


class dashBoard extends React.Component{
render(){
return(
	<div>
	<div className="row col-sm-4 ">
	<div className="panel panel-default ">
	 <div className="panel-heading">Groups
	  <div className="panel-body ">
	  <Addgroup/>
	  
	  </div>
	 
	 </div>
	 </div>
	 </div>
	<div className="row col-sm-3 col-sm-offset-1">
	<div className="panel panel-default ">
	 <div className="panel-heading">Messages
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

export default dashBoard;
