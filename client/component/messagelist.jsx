import React from 'react';
import MessageBoard from '../component/messageboard';


class MessageList extends React.Component{
    constructor(props){
    super(props);
    this.state ={
        messages:[
            'Hello this is just an hard coded message',
            'just trying this out'
        ]
    };   
    }
   render(){
       let messageNodes = this.state.messages.map((message)=>{
           return (
               <MessageBoard message= {message}/>
           );
       });
        return(
         
            <div>{messageNodes}</div>
           
        );
   }
}
export default MessageList;