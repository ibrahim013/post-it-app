import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Group from './Groups';
import { getGroups } from '../actions/GroupAction';

/**
 *
 * @description display group list
 * @export
 * @param {object} props
 * @class GetGroupList
 * @extends {Component}
 */
class GetGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Groups: this.props.Groups,
    };
  }
  componentDidMount() {
    this.props.getGroups();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Groups: nextProps.Groups,
    });
  }
  /**
   * @method render
   * Render react component
   *
   * @memberof AddGroup
   *
   * @returns {String} HTML markup for group list
   */
  render() {
    const { Groups } = this.state;
    const groupArray = Groups.map((group, groupid) => (
      <div key={ groupid } className="groupdisplay">
        <Group key={ groupid } group={ group } />
      </div>
    ));
    return <div>{groupArray}</div>;
  }
}
GetGroupList.PropTypes = {
  Groups: PropTypes.array.isRequired,
};
/**
   * connect to redux store
   * @param {any} groups
   */
function mapStateToProps(state) {
  return {
    Groups: state.groups,
  };
}
export default withRouter(connect(mapStateToProps, { getGroups })(GetGroupList));
