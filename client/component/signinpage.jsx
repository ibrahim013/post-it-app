import React from 'react';
import Signin from '../component/signin';
import PropTypes from 'prop-types';
import { connect } from'react-redux';
import{ userSigninRequest } from '../actions/usersigninAction';



class SigninPage extends React.Component{
render(){
	const { userSigninRequest } = this.props;
	return(
<div className="row">
<div className= "col-md-4 col-md-offset-4">
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