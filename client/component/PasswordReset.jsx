import React from 'react';
import axios from 'axios';


class PasswordReset extends React.Component{
constructor(props){
super(props)
this.state ={
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
	 axios.post('/user/passwordreset', {email:this.state.email});
	
}
render(){

return(
<div className= "col-md-4 col-md-offset-4">
<form onSubmit={this.onSubmit}>
<div className="form-group ps-style">
<label className ="control-label">Password Reset</label>
<input value={this.state.email} onChange={this.onChange}  type="email" name="email" className="form-control" placeholder="enter email" required/>
</div>
<div className="form-group">
<button  name="login" onSubmit={this.onSubmit} className="btn btn-primary btn-sm">
 Reset Password
</button>
</div>
</form>
</div>
);
}
}


export default PasswordReset;
