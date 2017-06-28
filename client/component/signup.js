import React from 'react';
import PropTypes from 'prop-types';
import{ userSignupRequest } from '../actions/usersignupAction';
import classnames from 'classnames';
import {browserHistory} from 'react-router-dom';



class Signup extends React.Component{
constructor(props){
	super(props);
	this.state = {
	username:'',
	password:'',
	email:'',
	errors:{},
	isLoading: false
	}
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}
onChange(e){
	this.setState({[e.target.name]: e.target.value});
}
onSubmit(e){
	e.preventDefault();
	this.setState({errors:{}, isLoading: true});
	this.props.userSignupRequest(this.state).then(
		() => {history.pushState(null,null,'/dashboard'); window.location.reload() },
	(err)=> this.setState({errors: err.response.data, isLoading:false}))
	
}
render(){
	const {errors} =this.state;
return(

<form onSubmit={this.onSubmit}>
<h2>CREATE ACCOUNT </h2>
<div className={classnames("form-group", {'has-error': errors.username})}>
<label className="control-label">User Name</label>
<input value={this.state.username} onChange={this.onChange} type="text" name="username" className="form-control" placeholder="eg:ibrahim"/>
{errors.username && <span className='help-block'>{errors.username}</span>}
</div>
<div className={classnames("form-group", {'has-error': errors.email})}>
<label className="control-label">Email</label>
<input value={this.state.emaii} onChange={this.onChange} type="email" name="email" className="form-control"  placeholder="eg:abc@company.com"/>
{errors.email && <span className='help-block'>{errors.email}</span>}
</div>
<div className={classnames("form-group", {'has-error': errors.password})}>
<label className="control-label">Password</label>
<input value={this.state.password} onChange={this.onChange}  type="password" name="password" className="form-control"  placeholder="At least 6 Characters"/>
{errors.password && <span className='help-block'>{errors.password}</span>}
</div>
<div className="form-group" >
<button disabled ={this.state.isLoading} name="login" className="btn btn-primary btn-lg col-md-offset-4-7">
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

