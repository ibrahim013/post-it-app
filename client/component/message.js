import React from 'react';
import Post from '../component/post';

class Message extends React.Component{
	constructor(props) {
		super(props);
		this.addPost = this.addPost.bind(this);
		this.handlePostEditorInputChange = this.handlePostEditorInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			posts: [],
			newPostBody: '',
		}
	}
	addPost(){
		const newState = Object.assign({}, this.state);
		newState.posts.push(this.state.newPostBody);
		newState.newPostBody = '';
		this.setState(newState);
	}
	handlePostEditorInputChange(ev){
		this.setState({
			newPostBody: ev.target.value
		})
	}
	onSubmit(e){
	e.preventDefault();
	axios.post('http://localhost:3000/api/group', 
		{
		message:this.state.newPostBody});
}
render(){

return(
	<div>
	<div className="panel panel-default ">
	 <div className="panel-heading">Messages
	 </div>
	 </div>
	 {
	 	this.state.posts.map((postBody, id) => {
	 		return(
	 			<Post Key={id} postBody = {postBody}/>
	 			)
	 	})
	 }
	
	
	<div className="panel-body">
	<textarea placeholder='Messages' onChange ={this.handlePostEditorInputChange} value={this.state.newPostBody}/>
	<br/>
	<button  name="send" className="btn btn-primary btn-small " onClick ={this.addPost} onSubmit={this.onSubmit}>Send</button>
	</div>
	
	</div>
);
}
}

export default Message;
