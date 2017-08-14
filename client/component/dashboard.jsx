import React from 'react';
import { connect } from 'react-redux';
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
	<div className="row col-sm-4 col-sm-offset-1">
	<div className="panel-group">
  <div className="panel panel-default">
    <div className="panel-heading">
      <h4 className="panel-title">
        <a data-toggle="collapse" href="#collapse1">Collapsible list group</a>
      </h4>
    </div>
    <div id="collapse1" className="panel-collapse collapse">
      <Addgroup/>
     
    </div>
  </div>
  </div>
</div>
	<div className="row col-sm-6 col-sm-offset-1">
	<div className="panel panel-default ">
	 <div className="panel-heading" >

		  <MessageList />
	 </div>
	 </div>
	 </div>  
	<div className="row col-sm-6 col-sm-offset-1">
	<div className="panel panel-default ">
	 <div className="panel-heading" > <MessageBox />
	 </div>
	 </div>
	 </div> 
	</div>
);
}
}



export default connect(null, { getAllGroups })(Dashboard);
