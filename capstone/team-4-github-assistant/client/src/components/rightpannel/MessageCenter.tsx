import React, { Component, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import GitHubBot from './GithubBot';
import ChatMessage from './Chat';
import RepositoryDetail from './gitbot/RepoDetail';
import RepoIssueDetail from './gitbot/IssueDetail';
import InvitationDetail from './gitbot/invitationDetail';
import '../../css/githubmessage.scss';
import '../../css/message.scss';

class MessageCenter extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	renderchatTemplate() {
		const template = this.props.messgae.map((item: any, i: number) => {
			return (
				<li key={i}>
					{(() => {
						let isReceviedMsgClass = (item.senderId !== this.props.loggedUser) ? 'received_msg':'';
						if (item.type === 'chat') {
							return (
								<div className={`${isReceviedMsgClass} message_container`}>
									<ChatMessage item={item} type="send" />
								</div>
							);
						}
						if (item.type === 'github') {
							return <GitHubBot subtype={item.subtype} />;
						}

						if (item.type === 'repodetail') {
							return (
								<div className={`${isReceviedMsgClass} github-message row`}>
									<RepositoryDetail details={item.details} />
								</div>
							);
						}

						if (item.type === 'issuedetail') {
							return (
								<div className={`${isReceviedMsgClass} github-message row`}>
									<RepoIssueDetail details={item.details} />
								</div>
							);
						}

						if (item.type === 'invitation') {
							return (
								<div className={`${isReceviedMsgClass} github-message row`}>
									<InvitationDetail details={item.details} />
								</div>
							);
						}
					})()}
				</li>
			);
		});

		return template;
	}

	componentDidUpdate() {
		//this.scrollToBottom();
	}
	scrollToBottom() {
		//window.scrollTo(0, document.body.scrollHeight);
	}

	render() {
		return (
			<Fragment>
				<ul className="message-list" ref="messageList">
					{this.renderchatTemplate()}
				</ul>
			</Fragment>
		);
	}
}
export default MessageCenter;
