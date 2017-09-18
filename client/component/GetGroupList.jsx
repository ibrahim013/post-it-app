import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Group from './Groups';
import { getGroups } from '../actions/GetGroupsAction';



class GetGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Groups: this.props.Groups
    }
  }
  componentWillMount(){
    this.props.getGroups();

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Groups: nextProps.Groups
    })
  }

  render() {
    const { Groups } = this.state;
    const groupArray = Groups.map((group, key) =>
    {
     return <div className = 'groupdisplay'><Group key={group.key} group={group}/></div>
     
    })
       return (
        <div> 
           { groupArray } 
        </div>
      );
   
  }

}
GetGroupList.PropTypes = {
    Groups: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      Groups: state.Groups
    }
  }
export default connect(mapStateToProps, { getGroups }) (GetGroupList);
