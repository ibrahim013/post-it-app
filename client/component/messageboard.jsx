import React from 'react';

class MessageBoard extends React.Component{
constructor(props){
	super(props);
}
render(){
return(
	<div>{this.props.message}</div>
);
}
}

export default MessageBoard;
