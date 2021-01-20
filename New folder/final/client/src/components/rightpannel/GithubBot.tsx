import React, { Component, Fragment } from 'react';
import GitHelp from './gitbot/Help';
import GitSign from './gitbot/Sign';

import '../../css/helpbot.scss'

class GitHubBot extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	renderBotMessage(subtype: string) {
		let template;
		switch (subtype) {
			case 'help':
				template = <GitHelp />;
				break;
			case 'signin':
				template = <GitSign />;
				break;
			default:
				template = <GitHelp />;
		}
		return template;
	}

	render() {
		return (
			<Fragment>
				<div className="row gitbotContainer">
					<div className="col-sm-12 col-md-6 col-offset-4">{this.renderBotMessage(this.props.subtype)}</div>
				</div>
			</Fragment>
		);
	}
}

export default GitHubBot;
