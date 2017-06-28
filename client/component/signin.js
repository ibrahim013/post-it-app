import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from'react-redux';
import{ userSigninRequest } from '../actions/usersignupAction';
import classnames from 'classnames';
import {browserHistory} from 'react-router-dom';


class Signin extends React.Component{
constructor(props){
	super(props);
	this.state = {
	email:'',
	password:'',
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
	this.props.userSigninRequest(this.state).then(
		() => {history.pushState(null,null,'/dashboard'); window.location.reload() },
	(err)=> this.setState({errors: err.response.data, isLoading:false}))
	
}
render(){
	const {errors} =this.state;
return(
<div className="row">

<form onSubmit={this.onSubmit}>
<h2>Login to POST IT</h2>
<div className={classnames("form-group", {'has-error': errors.username})}>
<label className="control-label">Email</label>
<input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="eg ibrahim@gmail.com"/>
{errors.username && <span className='help-block'>{errors.username}</span>}
</div>
<div className={classnames("form-group", {'has-error': errors.password})}>
<label className="control-label">Password</label>
<input value={this.state.password} onChange={this.onChange}  type="password" name="password" className="form-control" placeholder="must be at least 6 character long"/>
{errors.username && <span className='help-block'>{errors.username}</span>}
</div>
<div className="form-group">
<input  type="checkbox" value={this.state.checkbox} onChange={this.onChange}  name="checkbox"/><span>Remember Me</span>
</div>
<div className="form-group">
<button disabled ={this.state.isLoading} name="login" onSubmit={this.onSubmit} className="btn btn-primary btn-lg">
<span className="glyphicon glyphicon-log-in"></span> Login
</button>
</div>

</form>
<div>
  <span>Dont have an Account? </span><Link to="/signup">Sign up</Link>
</div>

</div>




		);

}
}

Signin.PropTypes= {
	userSigninRequest: PropTypes.func.isRequired
}
export default connect(null, {userSigninRequest}) (Signin);