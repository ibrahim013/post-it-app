import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addMessage } from '../actions/GroupAction';

/**
 *
 * @description add message
 * @export
 * @param {object} props
 * @class AddMessage
 * @extends {Component}
 */
export class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      piority: 'Normal',
      groupId: this.props.groupId,
      groupName: this.props.groupName,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    * @description Listens for changes in form fileds
    * @memberof  AddMessage
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to add message
     * route with message parameters
     * @param {object} event
     *
     * @memberof AddMessage
     *
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.addMessage(this.state);
    this.setState({
      message: '',
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupName: nextProps.groupName,
    });
  }
  /**
   * @method render
   * Render react component
   *
   * @memberof AddMessage
   *
   * @returns {String} HTML markup for the Adding message to group
   */
  render() {
    return (
      <div className="panel-body text">
        <form onSubmit={this.onSubmit}>
          <textarea
            className="form-control custom-control"
            placeholder="Messages"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
            required
            maxLength={300}
          />
          <div className="piority">
          <select className="form-control" id="sel1" onChange={this.onChange}
          name="piority">
            <option value="Normal">Normal</option>
            <option value="Critical">Urgent</option>
            <option value="Urgent">Critical</option>
          </select>
          </div>
          <div className="piority-s">
          <span className="input-group-addon btn btn-primary "
          onClick={this.onSubmit}>
            Send <span className=" glyphicon glyphicon-send" />
          </span>
          </div>
        </form>
      </div>
    );
  }
}
AddMessage.PropTypes = {
  Messages: PropTypes.array.isRequired,
};
export default withRouter(connect(null, { addMessage })(AddMessage));
