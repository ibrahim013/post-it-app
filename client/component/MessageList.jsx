import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Message from './Message';
import { getMessges } from '../actions/GroupAction';
import map from 'lodash/map'


class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: this.props.Messages
    }
  }
  componentWillMount(){
    this.props.getMessges();

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Messages: nextProps.Messages
    })
  }
  render() {
    console.log(this.props.params)
  const { Messages } = this.state;
  
  const messageList = Messages.map((message, i) =>
    {
     return <Message key={i} message={message}/>
     
    })
       return (
        <div> 
          i got here
            { messageList } 
            {console.log({ messageList })} 
            
        </div>
      );
   
  }

}
MessageList.PropTypes = {
   Messages: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      Messages: state.Messages
    }
  }
export default connect(mapStateToProps, { getMessges }) (MessageList);
