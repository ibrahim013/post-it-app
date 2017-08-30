import React from 'react';
import { Media } from 'react-bootstrap';

class MessageList extends React.Component {
  render() {
    return (
      <Media>
        <Media.Left>
          <img width={64} height={64} src="/assets/thumbnail.png" alt="Image" />
        </Media.Left>
        <Media.Body>
          <Media.Heading>Media Heading</Media.Heading>
          <p> this is just a message </p>
        </Media.Body>
 </Media>
    );
  }
}
export default MessageList;
