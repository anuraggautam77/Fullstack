import React, { Component, Fragment } from 'react';

class PostMessage extends Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			message: ''
		};
		this.messageAreaContoller = this.messageAreaContoller.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	messageAreaContoller(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			message: e.target.value
		});
	}

	sendMessage(e: any) {
		e.preventDefault();
		if (this.state.message !== '') {
			let isGitBot = this.flterGitbotCommands(this.state.message);
			if (!isGitBot) {
				this.props.postMessage({ type: 'chat', message: this.state.message, name: 'Anurag' });
			} else {
				this.triggerActions(this.state.message);
			}
		}
	}

	triggerActions(message: String) {
		let trimmed = message.trim();
		switch (trimmed) {
			case '/github signin':
				this.props.postMessage({ type: 'github', subtype: 'signin' });
				//window.location.href = '';
				break;

			case '/github help':
				this.props.postMessage({ type: 'github', subtype: 'help' });
				break;

			case '/github open':
				this.props.showOverlay({
					type: 'github',
					subtype: 'issue',
					repo: 'https://github.com/anuraggautam77/slack-demo'
				});
				break;

			case '/github createrepo':
				this.props.showOverlay({ type: 'github', subtype: 'repo' });
				break;

			case '/github adduser':
				this.props.showOverlay({
					type: 'github',
					subtype: 'adduser',
					repo: 'https://github.com/anuraggautam77/slack-demo'
				});
				break;

			default:
				console.log('actions mismatch');
		}
	}

	flterGitbotCommands(message: String) {
		return message[0] === '/';
	}

	render() {
		return (
			<Fragment>
				<div className="input box">
					<form onSubmit={this.sendMessage}>
						<input type="text" placeholder="Write your message..." onChange={this.messageAreaContoller} />
					</form>
				</div>
			</Fragment>
		);
	}
}

export default PostMessage;
