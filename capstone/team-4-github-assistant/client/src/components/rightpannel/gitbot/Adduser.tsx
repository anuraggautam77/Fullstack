import React, { Component, Fragment } from 'react';

const initialState = {};

class AddUserToRepo extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			userList: [ ...props.addUserList ],
			username: '',
			repo: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.addUserHandler = this.addUserHandler.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({ userList: [ ...props.addUserList ] });
	}

	renderOption() {
		const options = this.state.userList.map((user, i) => {
			if (user.gituser) {
				return (
					<option key={i} value={user.gituser}>
						{user.username}
					</option>
				);
			}
		});

		return options;
	}

	handleChange(event: any) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}

	addUserHandler(e: any) {
		e.preventDefault();
		const { username, repo } = this.state;
		console.log(username, repo);
		if (username !== '' && repo !== '') {
			alert(1);
			this.props.saveClick({ username, repo });
		}
	}

	render() {
		const { repo } = this.state;
		return (
			<Fragment>
				<form onSubmit={this.addUserHandler}>
					<div className="card" style={{ width: '100%' }}>
						<div className="card-header">
							<i className="fa fa-github" aria-hidden="true" />
							<strong> &nbsp; Add a user in Repository </strong>
						</div>
						<div className="card-body">
							<div className="form-group">
								<label>Repository</label>
								<input
									type="text"
									className="form-control"
									value={repo}
									onChange={this.handleChange}
									name="repo"
								/>
							</div>
							<div className="form-group">
								<label>Username</label>
								<select className="form-control" name="username" onChange={this.handleChange}>
									<option value="">Select One</option>
									{this.renderOption()}
								</select>
							</div>
							<button type="submit" className="btn btn-primary">
								Add User
							</button>
							&nbsp;
							<button
								type="button"
								onClick={() => {
									this.props.closewindow();
								}}
								className="btn btn-default"
							>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default AddUserToRepo;
