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
				this.props.postMessage({ type: 'chat', message: this.state.message });
			} else {
				this.triggerActions(this.state.message);
			}
			this.setState({ message: '' });
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
					repo: ''
				});
				break;

			case '/github createrepo':
				this.props.showOverlay({ type: 'github', subtype: 'repo' });
				break;

			case '/github adduser':
				this.props.showOverlay({
					type: 'github',
					subtype: 'adduser',
					repo: ''
				});
				break;

			default:
		}
	}

	flterGitbotCommands(message: String) {
		return message[0] === '/';
	}

	render() {
		return (
			<Fragment>
				<div className="input">
					<form onSubmit={this.sendMessage}>
						<label style={{ display: 'none' }}>Messgaename</label>
						<input
							type="text"
							placeholder="Write your message..."
							value={this.state.message}
							onChange={this.messageAreaContoller}
						/>
					</form>
				</div>
			</Fragment>
		);
	}
}

export default PostMessage;
