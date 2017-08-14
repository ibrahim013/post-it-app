import React from 'react';
import {Route} from 'react-router-dom';
import App from './component/app'; 
import SigninPage from './component/signinpage'; 
import SignupPage from './component/signuppage';
import MessageBoard from './component/messageboard';
import PasswordReset from './component/passwordreset';
import DashBoard from './component/Dashboard';


export default (
<div>
	
      <Route path="/"  component={App}/>
       <Route exact path="/" component={SigninPage}/>
       <Route exact path="/Signup" component={SignupPage} />
       <Route exact path="/messageboard" component={MessageBoard} />
       <Route exact path="/dashboard" component={DashBoard} />
       <Route exact path="/passwordreset" component={PasswordReset} />
       
    </div>
)

