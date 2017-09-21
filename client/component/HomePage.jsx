import React from 'react';
import LogIn from '../component/LogIn';

class HomePage extends React.Component{
render() {
return (
  <div>
    <div className="row ">
      <div className="col-md-4  col-sm-offset-4">
        <div className="login">Login</div>
        <LogIn/>
        </div>
      </div>

</div>

    );
  }
};
export default HomePage;
