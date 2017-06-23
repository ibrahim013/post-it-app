import React from 'react';
import Message from '../component/message';


class MessageBoard extends React.Component{
render(){

return(
	<div className='container'>
	<div className="row col-sm-4 ">
	<h1> is cal one</h1>
	</div>
	<div className="row col-sm-8">
	<Message/>
	</div>
	
	</div>
);
}
}

export default MessageBoard;
