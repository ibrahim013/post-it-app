import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './FlashMessage';
import { Media } from 'react-bootstrap';

class FlashMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map( message =>
    {
      <FlashMessage key={message.id} message={message}/>
    })
    return (
      <div> 
          {messages}
      </div>
    );
  }

}
FlashMessageList.PropTypes = {
    message: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      messages: state.FlashMessages
    }
  }
export default connect(mapStateToProps) (FlashMessageList);
