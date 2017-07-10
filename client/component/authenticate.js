import React from 'react';
import firebase from 'firebase';
import database from'../../server/database';
import PropTypes from 'prop-types';

export default function (compossedComponent){
	class Authenticate extends React.Component{
		componentWillMount(){
			let user = firebase.auth().currentUser;
			if (!user){
				() => {history.pushState(null,null,'/'); window.location.reload() },
				(err)=> this.setState({errors: err.response.data, isLoading:false})
	
			}

		}
		render(){
			return(
			<compossedComponent {...this.Props}/>
				);
			}
		}
		return Authenticate
	}

