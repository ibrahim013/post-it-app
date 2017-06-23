import React from 'react';
import PropTypes from 'prop-types';
import{ userSignupRequest } from '../actions/usersignupAction';
import axios from 'axios';

// Signup Components
class Signup extends React.Component{
constructor(props){
	super(props);
	this.state = {
	username:'',
	password:'',
	email:''
	}
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}
onChange(e){
	this.setState({[e.target.name]: e.target.value});
}
onSubmit(e){
	e.preventDefault();
	axios.post('http://localhost:3000/api/user/signup', 
		{
		username: this.state.username, 
		email:this.state.email, 
		password:this.state.password});
}
render(){
	const { userSignupRequest } = this.props;
return(

<form onSubmit={this.onSubmit}>
<h2>CREATE ACCOUNT </h2>
<div className="form-group">
<label className="control-label">User Name</label>
<input value={this.state.username} onChange={this.onChange} type="text" name="username" className="form-control"/>
</div>
<div className="form-group">
<label className="control-label">Email</label>
<input value={this.state.emaii} onChange={this.onChange} type="email" name="email" className="form-control"/>
</div>
<div className="form-group">
<label className="control-label">Password</label>
<input value={this.state.password} onChange={this.onChange}  type="password" name="password" className="form-control"/>
</div>
<div className="form-group" >
<button  name="login" className="btn btn-primary btn-lg col-md-offset-4-7">
<span className="glyphicon glyphicon-user"></span> Signup
</button>
</div>
</form>

	);
}
}

Signup.PropTypes = {
	userSignupRequest: PropTypes.func.isRequired
}
export default Signup;

