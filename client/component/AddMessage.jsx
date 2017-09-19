import React from 'react';
import addMessage from '../actions/AddMessage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Post from '../component/post';

class AddMessage extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			message:'',
			piority:'',
			groupname: this.props.groupid,
			

		}
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
	onSubmit(e){
	e.preventDefault();
	this.props.addMessage(this.state)
}
render(){
return(
	<div>
	{/* <div className="panel panel-default ">
	 <div className="panel-heading">Messages
	 </div>
	 </div>
	 {/* {
	 	this.state.posts.map((postBody, id) => {
	 		return(
	 			<Post Key={id} postBody = {postBody}/>
	 			)
	 	})
	 } */} 

	<div className="panel-body text">
	<textarea placeholder='Messages'name="message" onChange ={this.onChange} value={this.state.message}
    />
 <form onSubmit={this.onSubmit}>
    <label className="radio-inline">
      <input type="radio" name="piority" value="normal" onChange ={this.onChange}/>Normal
    </label>
    <label className="radio-inline">
      <input type="radio" name="piority" value="high" onChange ={this.onChange}/>Critical
    </label>
    <label className="radio-inline">
      <input type="radio" name="piority" value="critical" onChange ={this.onChange}/>Urgent
    </label>
		<br/>
		<button name="group" className="btn btn-primary btn-small" 
			onSubmit={this.onSubmit}>
			send
		</button>
  </form>
	</div>
	
	</div>
);
}
}
AddMessage.PropTypes = {
    Messages: PropTypes.array.isRequired
  }
  function mapStateToProps(state){
    return{
      Mesages: state.mesageText
    }
  }


export default connect(mapStateToProps, {addMessage}) (AddMessage);
