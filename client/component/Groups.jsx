import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 *
 * @description link to diffrent group
 * @export
 *
 * @extends {Component}
 */
const Group = ({ group }) => (
  <div className="grouplist">
    <li>
      <Link to={`/group/${group.groupid}`}>{group.groupname}</Link>
    </li>
  </div>
);
Group.PropTypes = {
  groupArray: PropTypes.array.isRequired,
};

export default Group;
