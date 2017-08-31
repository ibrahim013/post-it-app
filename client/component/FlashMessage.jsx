import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Media } from 'react-bootstrap';
import classnames from 'classnames';

class FlashMessage extends React.Component {
  render() {
    const {id, type, item}= this.props.message;
    return (
      <div className ={classnames('alert',{
        'alert-type': type === 'success', 
      'alert-danger': type ==='error'
      })}> 
        {text}
      </div>
    );
  }

}

FlashMessage.PropTypes   = {
    message: PropTypes.object.isRequired
}
export default FlashMessage;
