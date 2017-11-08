import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGroups } from '../actions/GroupAction';

/**
 *
 * @description add groups
 * @export
 * @param {object} props
 * @class AddGroup
 * @extends {Component}
 */

class AddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      groupName: '',
      description: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    * @description Listens for changes in form filed
    * @memberof AddGroup
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to add group
     * route with user parameters
     * @param {object} event
     *
     * @memberof AddGroup
     *
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.addGroups(this.state);
    this.setState({
      groupName: '',
      description: '',
    });
  }
  /**
   * @method render
   * Render react component
   *
   * @memberof AddGroup
   *
   * @returns {String} HTML markup for the Adding groups
   */

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="groupName"
              placeholder="Group Name"
              value={this.state.groupName}
              onChange={this.onChange}
              required
            />
          </div>
          <input
            type="text"
            name="description"
            placeholder="Group Discription"
            value={this.state.description}
            onChange={this.onChange}
            required
          />
          <button name="group" className="btn btn-primary btn-small"
          onSubmit={this.onSubmit}>
            Create Group
          </button>
        </form>
      </div>
    );
  }
}
AddGroup.PropTypes = {
  addGroups: PropTypes.func.isRequired,
};

export default withRouter(connect(null, { addGroups })(AddGroup));
