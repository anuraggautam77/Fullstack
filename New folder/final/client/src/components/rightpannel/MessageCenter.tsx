import React, { Component, Fragment } from 'react';
import GitHubBot from './GithubBot';
import ChatMessage from './Chat';
import RepositoryDetail from './gitbot/RepoDetail';
import RepoIssueDetail from './gitbot/IssueDetail';

import '../../css/githubmessage.scss';

class MessageCenter extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	renderchatTemplate() {
		const template = this.props.messgae.map((item: any, i: number) => {
			return (
				<li key={i}>
					{(() => {
						if (item.type === 'chat') {
							return <ChatMessage item={item} type="send" />;
						}
						if (item.type === 'github') {
							return <GitHubBot subtype={item.subtype} />;
						}

						if (item.type === 'repodetail') {
							return (
								<div className="github-message row">
									<RepositoryDetail details={item.details} />
								</div>
							);
						}

						if (item.type === 'issuedetail') {
							return (
								<div className="github-message row">
									<RepoIssueDetail details={item.details} />
								</div>
							);
						}
					})()}
				</li>
			);
		});

		return template;
	}

	render() {
		return (
			<Fragment>
				<ul className="message-list">{this.renderchatTemplate()}</ul>
			</Fragment>
		);
	}
}
export default MessageCenter;
