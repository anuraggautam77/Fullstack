import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getGitHubUser } from '../../store/actions/slackAction';
import { connect } from 'react-redux';
class UserList extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			userList: []
		};
	}

	componentDidMount() {
		this.props.getGitUser();
	}

	render() {
		return (
			<Fragment>
				<div className="chat-channel">
					<div className="chat-channel-name">
						<div>
							<h5>Direct Message</h5>
						</div>
					</div>
					<div className="channel-list">
						{this.props.userList.length &&
							this.props.userList.map((item: any, i: number) => (
								<div className="chat-channel-item" key={i}>
									<i className="fa fa-user" aria-hidden="true" />
									&nbsp;<Link to={`/app/user/${item.username}`}>{item.username}</Link>
								</div>
							))}
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		userList: state.gitHubReducer.gitHubUser
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		getGitUser: (data: any) => dispatch(getGitHubUser(data))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
