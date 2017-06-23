import { connect } from 'react-redux';
import AddGroup from '../component/addgroup';
import {watchMembersAddedEvent} from '../actions/membersadded'
import {addToGroup} from '../actions/addGroupAction';

function mapStateToProps(state) {
  return {
    AddGroup: state.addgroup
  };
}

function mapDispatchToProps(dispatch) {
  watchMembersAddedEvent(dispatch);
  return {
    addGroup: () => dispatch(getAddGroup()),
    AddToGroup: (gropuname) => dispatch(addToGroup(groupname))
  };
}

const addgroup = connect(mapStateToProps, mapDispatchToProps)(AddGroup);

export default addgroup;
