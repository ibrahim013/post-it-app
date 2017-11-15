import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Message from './Message';
import { getMessges } from '../actions/GroupAction';

/**
 *
 * @description display message list
 * @export
 * @param {object} props
 * @class MessageList
 * @extends {Component}
 */

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: this.props.Messages,
    };
  }
  componentDidMount() {
    this.props.getMessges();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Messages: nextProps.Messages,
    });
  }
  /**
   * @method render
   * Render react component
   * @memberof MessageList
   *
   * @returns {String} HTML markup for looping throug the group
   */

  render() {
    const { Messages } = this.state;
    const messageList = Messages.map((message, i) =>
    <Message key={i} message={message} />);
    return <div>{messageList}</div>;
  }
}
MessageList.PropTypes = {
  Messages: PropTypes.array.isRequired,
};
/**
   * connect to redux store
   * @param {any} message
   */
function mapStateToProps(state) {
  return {
    Messages: state.Messages,
  };
}
export default withRouter(connect(mapStateToProps,
  { getMessges })(MessageList));
