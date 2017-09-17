import React from 'react';
// import Post from '../component/post';

class AddMessage extends React.Component{
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

	<div className="panel-body text">
	<textarea placeholder='Messages' onChange ={this.handlePostEditorInputChange} value={this.state.newPostBody}
    />
 <form>
    <label className="radio-inline">
      <input type="radio" name="optradio"/>Normal
    </label>
    <label className="radio-inline">
      <input type="radio" name="optradio"/>High
    </label>
    <label className="radio-inline">
      <input type="radio" name="optradio"/>Urgent
    </label>
  </form>
	</div>
	
	</div>
);
}
}

export default AddMessage;
