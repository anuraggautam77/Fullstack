import React, { Component, Fragment } from 'react';

const initialState = {};

class AddUserToRepo extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}


	addUserHandler() {}

	render() {
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
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									value="https://github.com/anuraggautam77/slack-demo"
									readOnly
								/>
							</div>
							<div className="form-group">
								<label>Username</label>
								<select className="form-control">
									<option>user1 </option>
									<option>user2</option>
									<option>user2</option>
									<option>user2</option>
									<option>user2</option>
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
