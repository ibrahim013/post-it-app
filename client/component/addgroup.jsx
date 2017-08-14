import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import database from '../../server/database'
import firebase from 'firebase';
import map from 'lodash/map';


class AddGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupname: '',
      groups: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    axios.post('/group', { groupname: this.state.groupname });;
  }
  componentDidMount() {
    // const groupRef = firebase.database().ref('group');
    // groupRef.on('value', (snapshot) => {
    //   let groups = snapshot.val();
    //   let newState = [];
      // for (let group in groups) {
      //   newState.push({
      //     id: group,
      //     name: group.name
      //   });
      // }
    //   this.setState({
    //     groups: newState
    //   });
    // });
  }

  componentWillReceiveProps(nextProps) {
    let newState = [];
    for (let group in nextProps.groups) {
        newState.push({
          id: group,
          name: group.name
        });
      }
    this.setState({
      groups: newState
    })
  }
  render() {

    return (

      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="groupname" placeholder="Group Name" value={this.state.groupname}
            onChange={this.onChange} />
          <button name="group" className="btn btn-primary btn-small"
            onSubmit={this.onSubmit}>
            Create Group
  </button>
        </form>
        <div className="row">
          <ul className="list-group">
            {this.state.groups.map((group) => {
              return (
                <li className="list-group-item" key={group.id}>{group.id}</li>
              )
            })}


          </ul>

        </div>

      </div>
    )
  };
}

const mapStateToProps = state => (
  {
    groups: state.groups
  }
)
export default connect(mapStateToProps)(AddGroup);