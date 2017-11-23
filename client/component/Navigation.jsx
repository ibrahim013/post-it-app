import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut } from '../actions/UserAction';

/**
 * @description display app header with login user component
 *
 * @export
 *
 * @class Navigation
 *
 * @extends {Component}
 */
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
     * @description Makes an action call to signout route
     *
     * @memberof AddGroup
     *
     * @returns {void}
  */
  onSubmit() {
    this.props.signOut();
    this.props.history.push('/');
  }

  /**
   * @method render
   * Render react component
   *
   * @memberof render
   *
   * @returns {String} HTML markup for the header
   */
  render() {
    const { user, isAuthenticated } = this.props;
    const loginUser = user.map(user => (
      <span key={0} id="span">
        <Avatar size={35} round name={this.props.user[0].displayName} />
        &nbsp;&nbsp;
        {user.displayName}
      </span>
    ));
    return (
        <div>
          <li>{loginUser}</li>
          <li>
            <div>
              {isEmpty(isAuthenticated) ? (
                <div />
              ) : (
                <div>
                  <button
                    onClick={() => {
                      this.onSubmit();
                    }}
                    className="signout"
                  >
                    Signout
                  </button>
                  <button
                    onClick={() => {
                      this.props.history.push('/dashboard');
                    }}
                    className="signout"
                  >
                    Dashboard
                  </button>
                </div>
              )}
            </div>
          </li>
      </div>
    );
  }
}
Navigation.PropTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
   * connect to redux store
   * @param {any} user
   */
function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: state.user,
  };
}

export default withRouter(connect(mapStateToProps, { signOut })(Navigation));
