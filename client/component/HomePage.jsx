import React from 'react';
import Login from '../component/LogIn';

/**
 * @description this component is the home page component
 *
 * @export
 * @class Homepage
 * @extends {Component}
 */
const HomePage = () => (
  <div>
    <div className="row">
      <div className="col-md-4 col-md-offset-4 col-sm-5 col-sm-offset-4 blogin">
        <div className="login">Login</div>
        <Login />
      </div>
    </div>
  </div>
);

export default HomePage;
