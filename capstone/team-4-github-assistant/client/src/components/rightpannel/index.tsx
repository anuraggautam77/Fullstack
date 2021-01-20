import React, { Component, Fragment } from 'react';
import {
	createissue,
	getissueslist,
	createRepo,
	getGitHubUser,
	addUserInRepo,
	addNewMessage,
	getUserMessgae,
	getChannelMessgae,
	addDirectMessage,
	changeProgressStatus
} from '../../store/actions/slackAction';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import RightHeader from './RightHeader';
import MessageCenter from './MessageCenter';
import PostMessage from './PostMessage';
import OpenIssue from './gitbot/CreateIssue';
import CreateRepo from './gitbot/CreateRepo';
import AddUserToRepo from './gitbot/Adduser';
import { withRouter } from 'react-router-dom';
import { getCookie } from '../../static';

const customStyles = {
	content: {
		top: '5%',
		left: '25%',
		right: 'auto',
		bottom: 'auto',
		width: '50%',
		zIndex: 999999999999999
	}
};

interface createRepoType {
	title: string;
	body: string;
}

interface addUserType {
	username: String;
	repo: String;
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
			userList: [],
			channelId: null,
			userId: null
		};
	}

	componentDidMount() {
		//this.props.getGitUser();
	}

	componentWillReceiveProps(props) {
		this.closeModal();
		if (props.routes.channelId && props.routes.channelId !== this.state.channelId) {
			this.setState({ channelId: props.routes.channelId, userId: null }, () => {
				this.props.getChannelMessages(this.state.channelId);
			});
		}

		if (props.routes.userId && props.routes.userId !== this.state.userId) {
			this.setState({ userId: props.routes.userId, channelId: null }, () => {
				this.props.getUsersMessages({ userId: this.state.userId, senderId: this.props.loggedUser });
			});
		}

		if (props.repoStatus === 'GET_REPO' && props.inProgress) {
			this.addMessageHandler({ type: 'repodetail', details: props.gitRepo });
			this.props.changeProgress();
		}

		if (props.repoStatus === 'GET_ISSUE' && props.inProgress) {
			this.addMessageHandler({ type: 'issuedetail', details: props.repoIssue });
			this.props.changeProgress();
		}

		if (props.repoStatus === 'INVITATION' && props.inProgress) {
			this.addMessageHandler({ type: 'invitation', details: props.invitation });
			this.props.changeProgress();
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
		item.userId = this.state.userId;
		item.senderId = this.props.loggedUser;
		item.channelId = this.state.channelId;
		if(item.type !== 'github' || (item.subtype !== 'help' && item.subtype !== 'signin')){
			this.props.saveNewMessage(item);
		}else{
			this.props.addDirectMessageHandler({newMessage:item});
		}
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
						addUserList={this.props.userList}
						closewindow={() => {
							this.closeModal();
						}}
						saveClick={(item: addUserType) => {
							this.props.AddUserInRepo(item);
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
					<MessageCenter messgae={this.props.chats} loggedUser={this.props.loggedUser}/>
				</div>
				<PostMessage
					loggedUser={this.props.loggedUser}
					postMessage={(item: any) => { this.addMessageHandler(item); }}
					showOverlay={(item: any) => { this.showIssueOverlay(item); }}
				/>
			</Fragment>
		);
	}
}

function mapStateToProps(state: any, props: any) {
	return {
		gitRepo: state.gitHubReducer.repoDetail,
		inProgress: state.gitHubReducer.inProgress,
		repoIssue: state.gitHubReducer.issueDetail,
		issueList: state.gitHubReducer.issueList,
		repoStatus: state.gitHubReducer.repoStatus,
		userList: state.gitHubReducer.gitHubUser,
		invitation: state.gitHubReducer.invitationDetail,
		loggedUser: state.loginReducer.userId ? state.loginReducer.userId : getCookie('username'),
		chats: state.slackReducer.messages,
		routes: props.match.params
	};
}

function mapDispatchToProps(dispatch: any) {
	return {
		createNewIssue: (payload: createIssueType) => dispatch(createissue(payload)),
		createNewRepo: (payload: createRepoType) => dispatch(createRepo(payload)),
		AddUserInRepo: (payload: addUserType) => dispatch(addUserInRepo(payload)),
		getGitUser: (data: any) => dispatch(getGitHubUser(data)),
		saveNewMessage: (data: any) => dispatch(addNewMessage(data)),
		addDirectMessageHandler: (data: any) => dispatch(addDirectMessage(data)),
		getChannelMessages: (payload) => dispatch(getChannelMessgae(payload)),
		getUsersMessages: (payload: any) => dispatch(getUserMessgae(payload)),
		changeProgress: () => dispatch(changeProgressStatus())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightPanel));
