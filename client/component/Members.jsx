import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMembers } from '../actions/GroupAction';

/**
 * 
 * @description add user to groups
 * @export
 * @param {object} props
 * @class Members
 * @extends {Component}
 */

class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      member: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
    * @method onChange
    * @description Listens for changes in form fileds 
    * @memberof Members
    * @param {object} event
    *
    * @returns {void}
    */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
     * @description Makes an action call to add members
     * route with user parameters
     * @param {object} event
     *
     * @memberof Member
     * 
     * @returns {void}
  */
  onSubmit(event) {
    event.preventDefault();
    this.props.addMembers(this.state);
    this.setState({
      member: '',
      errors: {},
    });
  }
  /**
   * @method render
   * Render react component
   * 
   * @memberof Member
   * 
   * @returns {String} HTML markup for the Adding group members
   */
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="membername"
              placeholder="Name"
              value={this.state.groupname}
              onChange={this.onChange}
              required
            />
          </div>
          <button name="members" className="btn btn-primary btn-small" onSubmit={this.onSubmit}>
            Add Members
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(connect(null, { addMembers })(Members));
