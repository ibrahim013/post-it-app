import React from 'react';
import LogIn from '../component/LogIn';

class HomePage extends React.Component{
render() {
return (
  <div>
    < div className=" row home jumbotron">
      <h1>When it Comes to Messaging...</h1>
      <h2>We Got You Covered</h2>
      <p><button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">
      Get Started
      </button>
      </p>
    </div>
  <div className="container">
  <div className="modal fade" id="myModal" role="dialog" data-keyboard ="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4><span className="glyphicon glyphicon-lock"></span> Login</h4>
        </div>
        <div className="modal-body">
          <LogIn/>
        </div>
       
      </div>
      
    </div>
  </div>
  
</div>
</div>

    );
  }
};
export default HomePage;
