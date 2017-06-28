import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
class AddGroup extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      groupname: ''
    };
  
this.onChange = this.onChange.bind(this);
this.onSubmit = this.onSubmit.bind(this);
}

onChange(e){
	this.setState({[e.target.name]: e.target.value});
}
onSubmit(e){
	e.preventDefault();
	axios.post('/group', {groupname:this.state.groupname});;
}
render(){

return(

<div>
<form onSubmit = {this.onSubmit}>
  <input type="text" name="groupname" placeholder="Group Name" value={this.state.groupname}
  onChange={this.onChange}/>
  <button  name="login" className="btn btn-primary btn-small"
   onSubmit = {this.onSubmit}>
	 Create Group
	</button> 
</form>		
</div>
	)};
}
export default AddGroup;