import React from 'react';
import Signup from '../component/signup';
import PropTypes from 'prop-types';
import { connect } from'react-redux';
import{ userSignupRequest } from '../actions/usersignupAction';



class SignupPage extends React.Component{
render(){
	const { userSignupRequest } = this.props;
	return(
<div className="row">
<div className= "col-md-4 col-md-offset-4">
<Signup />
</div>
</div>
	);
}
}
SignupPage.PropTypes= {
	userSignupRequest: PropTypes.func.isRequired
}
export default connect((state) => {return { }, {userSignupRequest}}) (SignupPage);