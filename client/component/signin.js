import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

class Signin extends React.Component{
constructor(props){
	super(props);
	this.state = {
	email:'',
	password:''
	}
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
}
onChange(e){
	this.setState({[e.target.name]: e.target.value});
}
onSubmit(e){
	e.preventDefault();
	axios.post('http://localhost:3000/api/user/signin', {email:this.state.email, password:this.state.password});;
}
render(){
return(
<div className="row">
<div className= "col-md-4 col-md-offset-4">
<form onSubmit={this.onSubmit}>
<h2>Login</h2>
<div className="form-group">
<label className="control-label">Email</label>
<input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control"/>
</div>
<div className="form-group">
<label className="control-label">Password</label>
<input value={this.state.password} onChange={this.onChange}  type="password" name="password" className="form-control"/>
</div>
<div className="form-group">
<input  type="checkbox" value={this.state.checkbox} onChange={this.onChange}  name="checkbox"/><span>Remember Me</span>
</div>
<div className="form-group">
<button  name="login" onSubmit={this.onSubmit} className="btn btn-primary btn-lg">
<span className="glyphicon glyphicon-log-in"></span> Login
</button>
</div>

</form>
</div>
</div>
		);
}
}

export default Signin;

