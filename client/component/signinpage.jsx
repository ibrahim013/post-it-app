import React from 'react';
import Signin from '../component/signin';
import PropTypes from 'prop-types';
import { connect } from'react-redux';
import{ userSigninRequest } from '../actions/usersigninAction';



class SigninPage extends React.Component{
render(){

	
	const { userSigninRequest } = this.props;
	return(
	<div className="row" >
		<div className= "col-md-7 side">
		<h1>when it come's to messaging </h1>
		<h2>we got you covered 	</h2>
		<button className="btn btn-large botton">Find out More </button>
		</div>
<div className= "col-md-3 ">
<Signin userSigninRequest={userSigninRequest}/>
</div>
</div>
	);
}
}
SigninPage.PropTypes= {
	userSigninRequest: PropTypes.func.isRequired
}
export default connect(null, {userSigninRequest}) (SigninPage);