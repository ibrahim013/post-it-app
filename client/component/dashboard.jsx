import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Addgroup from '../component/addgroup';
import {addGroupAction} from '../actions/usersignupAction';
import { getAllGroups } from '../actions/groupActions';
import MessageList from '../component/messagelist';
import MessageBox from '../component/messagebox';  


class Dashboard extends React.Component{
	constructor() {
		super();
		this.state = {
			groups: []
		}
	}
	componentDidMount() {
		this.props.getAllGroups();
	}

render(){
	
return(
	<div>
		<div className="row">
			<div className="col-md-4 col-md-offset-1">
				<img src="https://firebasestorage.googleapis.com/v0/b/postit-ace3a.appspot.com/o/mypass.jpg?alt=media&token=ce82a2c9-1895-4436-8660-a81a94cbd087" className="img-responsive img-circle" width="50%"  alt="profile pics"/>
			</div>
			<div className="col-md-6">
				<Link to="/signout">Sign Out</Link>
			</div>

		</div>
		<div className="row ">
	<div className="col-md-3 col-md-offset-1 scroll">

      <Addgroup/>
     
    </div>
  

	<div className="col-md-5">

		  <MessageList />
 			<MessageBox />
	 </div>
	 <div className="col-md-3">
	<h1>Users</h1>
	 </div>
	 

	 
	</div>
	</div>
);
}
}



export default connect(null, { getAllGroups })(Dashboard);
