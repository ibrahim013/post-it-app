import React from 'react';
import Login from '../component/LogIn';

const HomePage = () => (
  <div>
    <div className="row">
      <div className="col-md-4 col-sm-offset-4  blogin">
        <div className="login">Login</div>
        <Login />
      </div>
    </div>
  </div>
);

export default HomePage;
