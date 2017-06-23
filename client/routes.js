import React from 'react';
import {Route} from 'react-router-dom';
import App from './component/app'; 
import Signin from './component/signin'; 
import SignupPage from './component/signuppage';
import MessageBoard from './component/profilepage';
import dashBoard from './component/dashboard';

export default (
<div>
      <Route path="/" component={App} />
      <Route exact path="/" component={Signin}/>
       <Route exact path="/Signup" component={SignupPage} />
       <Route exact path="/messageboard" component={MessageBoard} />
       <Route exact path="/dashboard" component={dashBoard} />
    </div>
)
