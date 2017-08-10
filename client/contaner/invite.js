import {connect} from 'react-redux';


function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  watchMemberAddedEvent(dispatch);
  return {
    onGetInvite: () => dispatch(getInvite()),
    onAddToInvite: (name) => dispatch(addToInvite(name))
  };
}

const inviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default inviteContainer;
