import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class Group extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
     const{ group } = this.props;
    return (
    <div className="grouplist">
      <li > <Link to={'/group/'+group.groupid}>{group.groupname}</Link></li>
     </div>
    );
  }

}
Group.PropTypes   = {
   groupArray: PropTypes.array.isRequired
}


export default Group;

