import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
class UserList extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<div id="contacts" className="chat-users">
					<div className="users-list">
						<div className="chat-user">
							<div>
								<Link to="/app/user/1">Karl Jordan</Link>
							</div>
						</div>
						<div className="chat-user">
							<div>
								<Link to="/app/user/1">Monica Smith</Link>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default UserList;
