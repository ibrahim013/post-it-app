import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 *
 * @description Message Links
 * @export
 * @class Message
 * @extends {Component}
 */

const Message = ({ message }) => (
      <div className="grouplist">
        <li>
          <Link to="/">{message.groupname.Message}</Link>
        </li>
      </div>
    );

Message.PropTypes = {
  MessageList: PropTypes.array.isRequired,
};

export default Message;
