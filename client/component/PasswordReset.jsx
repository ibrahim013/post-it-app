import React from 'react';
import axios from 'axios';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import FlashMessageList from './FlashMessageList';
import addFlashMessage from '../actions/AddFlashMessage';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class PasswordReset extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			error: {},
			isLoading:false,
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
	e.preventDefault();
	axios.post('/user/passwordreset', { email: this.state.email }).then(
		(response) => {
			this.props.addFlashMessage({
				type: 'success',
				text: 'A password reset link have being sent to your mail'})
			this.setState({
				isLoading: true
			})
		})
		.catch((err) => {
			if (err.response) {
               toastr.error(err.response.data.errorCode);
			}
		});
	}
	render() {

		return (
<div className="col-md-4 col-md-offset-4">
<form onSubmit={this.onSubmit}>
	<FlashMessageList/>
<div className="form-group ps-style">
	<label className="control-label">Password Reset</label>
	<input value={this.state.email} onChange={this.onChange} type="email" 
	name="email" className="form-control" placeholder="enter email" required />
</div>
<div className="form-group">
	<button name="login" onSubmit={this.onSubmit}  
	disabled={this.state.isLoading} className="btn btn-primary btn-sm">
		Reset Password
</button>
		</div>
	</form>
</div>
);
}
}

PasswordReset.PropTypes = {
  addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(connect(null, {addFlashMessage })(PasswordReset));
