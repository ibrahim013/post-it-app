import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';


class FlashMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map( message =>
    {
     return <FlashMessage key={message.id} message={message}/>
    })
    return (
      <div> 
          {messages}
      </div>
    );
  }

}
FlashMessageList.PropTypes = {
    messages: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      messages: state.FlashMessages
    }

  }
export default connect(mapStateToProps) (FlashMessageList);
