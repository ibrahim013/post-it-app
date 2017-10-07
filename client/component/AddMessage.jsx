import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addMessage from '../actions/AddMessage';


class AddMessage extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			message:'',
			piority:'',
			groupname: this.props.groupid,

		}
		console.log(this.props.groupid)
		this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
	onSubmit(event){
	event.preventDefault();
	this.props.addMessage(this.state)
}
render(){
return(
	<div>
	<div className="panel-body text">
	<textarea className="form-control custom-control "
	placeholder='Messages'name="message" onChange ={this.onChange} 
	value={this.state.message}
    /><span className="input-group-addon btn btn-primary" 
		onClick={this.onSubmit}>Send</span>
 <form onSubmit={this.onSubmit}>
    <label className="radio-inline">
      <input type="radio" name="piority" value="normal" 
			onChange ={this.onChange}/>Normal
    </label>
    <label className="radio-inline">
      <input type="radio" name="piority" value="high" 
			onChange ={this.onChange}/>Critical
    </label>
    <label className="radio-inline">
      <input type="radio" name="piority" value="critical" 
			onChange ={this.onChange}/>Urgent
    </label>
  </form>
	</div>
	</div>
);
}
}
AddMessage.PropTypes = {
		Messages: PropTypes.array.isRequired,
		
  }
  function mapStateToProps(state){
    return{
      // Mesages: state.mesageText
    }
  }


export default connect(mapStateToProps, {addMessage}) (AddMessage);
