import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavigationBar from '../component/navigationBar';
import Signin from '../component/signin'; 
import Signup from '../component/signup';
class App extends React.Component{
	render(){
	return(
		<div>
		<NavigationBar/>
		<Signin/>
		<Signup/>
		</div>
		);
	}}







export default App;
