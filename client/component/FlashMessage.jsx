import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  render() {
    const {id, type, text}= this.props.message;
    return (
      <div className ={classnames('alert',{
        'alert-success': type === 'success', 
      'alert-danger': type ==='error'
      })}> 
        {text}
      </div>
    );
  }

}

FlashMessage.PropTypes   = {
    messages: PropTypes.object.isRequired
}
export default FlashMessage;
