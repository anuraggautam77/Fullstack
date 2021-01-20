import React, { Component, Fragment } from 'react';
import { createissue, getissueslist, createRepo } from '../../store/actions/slackAction';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import RightHeader from './RightHeader';
import MessageCenter from './MessageCenter';
import PostMessage from './PostMessage';
import OpenIssue from './gitbot/CreateIssue';
import CreateRepo from './gitbot/CreateRepo';
import AddUserToRepo from './gitbot/Adduser';

const customStyles = {
	content: {
		top: '5%',
		left: '25%',
		right: 'auto',
		bottom: 'auto',
		width: '50%',
		zIndex: 10000
	}
};

interface createRepoType {
	title: string;
	body: string;
}

interface createIssueType {
	title: string;
	body: string;
	url: string;
	label: string;
}

class RightPanel extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			modalIsOpen: false,
			subtype: '',
			chats: [
				
				{
					type: 'issuedetail',
					details: {
						title: 'waeq',
						description: 'ewqe',
						issueurl: 'https://github.com/anuraggautam77/MERN-socketio-chat-example/issues/8',
						repourl: 'https://api.github.com/repos/anuraggautam77/MERN-socketio-chat-example',
						owner: {
							login: 'anuraggautam77',
							id: 1465967,
							node_id: 'MDQ6VXNlcjE0NjU5Njc=',
							avatar_url: 'https://avatars1.githubusercontent.com/u/1465967?v=4',
							gravatar_id: '',
							url: 'https://api.github.com/users/anuraggautam77',
							html_url: 'https://github.com/anuraggautam77',
							followers_url: 'https://api.github.com/users/anuraggautam77/followers',
							following_url: 'https://api.github.com/users/anuraggautam77/following{/other_user}',
							gists_url: 'https://api.github.com/users/anuraggautam77/gists{/gist_id}',
							starred_url: 'https://api.github.com/users/anuraggautam77/starred{/owner}{/repo}',
							subscriptions_url: 'https://api.github.com/users/anuraggautam77/subscriptions',
							organizations_url: 'https://api.github.com/users/anuraggautam77/orgs',
							repos_url: 'https://api.github.com/users/anuraggautam77/repos',
							events_url: 'https://api.github.com/users/anuraggautam77/events{/privacy}',
							received_events_url: 'https://api.github.com/users/anuraggautam77/received_events',
							type: 'User',
							site_admin: false
						}
					}
				},
				{
					type: 'repodetail',
					details: {
						reponame: 'sdas',
						description: 'dsadas',
						fullname: 'anuraggautam77/sdas',
						repo_url: 'https://github.com/anuraggautam77/sdas',
						owner: {
							login: 'anuraggautam77',
							id: 1465967,
							node_id: 'MDQ6VXNlcjE0NjU5Njc=',
							avatar_url: 'https://avatars1.githubusercontent.com/u/1465967?v=4',
							gravatar_id: '',
							url: 'https://api.github.com/users/anuraggautam77',
							html_url: 'https://github.com/anuraggautam77',
							followers_url: 'https://api.github.com/users/anuraggautam77/followers',
							following_url: 'https://api.github.com/users/anuraggautam77/following{/other_user}',
							gists_url: 'https://api.github.com/users/anuraggautam77/gists{/gist_id}',
							starred_url: 'https://api.github.com/users/anuraggautam77/starred{/owner}{/repo}',
							subscriptions_url: 'https://api.github.com/users/anuraggautam77/subscriptions',
							organizations_url: 'https://api.github.com/users/anuraggautam77/orgs',
							repos_url: 'https://api.github.com/users/anuraggautam77/repos',
							events_url: 'https://api.github.com/users/anuraggautam77/events{/privacy}',
							received_events_url: 'https://api.github.com/users/anuraggautam77/received_events',
							type: 'User',
							site_admin: false
						}
					}
				},
				{ type: 'github', subtype: 'help' },
				{ type: 'github', subtype: 'signin' }
			]
		};
	}

	componentWillReceiveProps(props) {
		this.closeModal();

		if (props.repoStatus === 'GET_REPO') {
			this.addMessageHandler({ type: 'repodetail', details: props.gitRepo });
		}

		if (props.repoStatus === 'GET_ISSUE') {
			this.addMessageHandler({ type: 'issuedetail', details: props.repoIssue });
		}
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	addMessageHandler(item: any) {
		this.setState({
			chats: [ ...this.state.chats, item ]
		});
	}

	showIssueOverlay(item: any) {
		this.setState({
			modalIsOpen: true,
			subtype: item.subtype
		});
	}

	renderOverLay() {
		let overTemplate;
		switch (this.state.subtype) {
			case 'issue':
				overTemplate = (
					<OpenIssue
						closewindow={() => {
							this.closeModal();
						}}
						saveClick={(item: createIssueType) => {
							this.props.createNewIssue(item);
						}}
					/>
				);
				break;

			case 'repo':
				overTemplate = (
					<CreateRepo
						closewindow={() => {
							this.closeModal();
						}}
						saveClick={(item: createRepoType) => {
							this.props.createNewRepo(item);
						}}
					/>
				);
				break;
			case 'adduser':
				overTemplate = (
					<AddUserToRepo
						closewindow={() => {
							this.closeModal();
						}}
						saveClick={(item: any) => {
							console.log(item);
						}}
					/>
				);
				break;

			default:
		}

		return overTemplate;
	}

	render() {
		return (
			<Fragment>
				<RightHeader />
				<div className="messages box" style={{ background: 'antiquewhite' }}>
					<Modal isOpen={this.state.modalIsOpen} style={customStyles}>
						{this.renderOverLay()}
					</Modal>
					<MessageCenter messgae={this.state.chats} />
				</div>
				<PostMessage
					postMessage={(item: any) => {
						this.addMessageHandler(item);
					}}
					showOverlay={(item: any) => {
						this.showIssueOverlay(item);
					}}
				/>
			</Fragment>
		);
	}
}

function mapStateToProps(state: any) {
	return {
		gitRepo: state.gitHubReducer.repoDetail,
		repoIssue: state.gitHubReducer.issueDetail,
		issueList: state.gitHubReducer.issueList,
		repoStatus: state.gitHubReducer.repoStatus
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		createNewIssue: (payload: createIssueType) => dispatch(createissue(payload)),
		createNewRepo: (payload: createRepoType) => dispatch(createRepo(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
