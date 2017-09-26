import React from 'react';
import LogIn from '../component/LogIn';
import FlashMessageList from './FlashMessageList';

class HomePage extends React.Component{
render() {
return (
  <div>
    <div className="row ">
      <div className="col-md-4  col-sm-offset-4">
        <FlashMessageList/>
        <div className="login">Login</div>
        <LogIn/>
        </div>
      </div>

</div>

    );
  }
};
export default HomePage;
