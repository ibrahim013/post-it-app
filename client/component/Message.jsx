import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Message extends React.Component {
  render() {
    const { message } = this.props;
    return (
      <div className="grouplist">
        <li>
          <Link to="/">{message.groupname.Message}</Link>
        </li>
      </div>
    );
  }
}
Message.PropTypes = {
  MessageList: PropTypes.array.isRequired,
};

export default Message;
