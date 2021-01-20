import React, { Component, Fragment } from 'react';

import ThreadComponent from "./Thread";

class MessageCenter extends Component {
	constructor(props) {
        super(props);
		this.state = {
			messages: props.messages,
			currentChannel: props.currentChannel,
			newmessage: '',
            currentthread: '',
            threads:props.threads
		};
	}

	componentWillReceiveProps(newprops) {
		this.setState({ messages: newprops.messages,   threads:newprops.threads, currentChannel: newprops.currentChannel });
	}

	openThread(id) {
		this.setState({
			...this.state,
			currentthread: id
		});
	}

	rendertemplate() {
		const template = this.state.messages.map((message, i) => {
			return (
				<div className="incoming_msg" key={i}>
					<div className="incoming_msg_img">
						<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
					</div>
					<div className="received_msg">
						<div style={{ float: 'right' }}>
							<i
								className="fa fa-renren"
								onClick={() => {
									this.openThread(message.id);
								}}
								style={{ cursor: 'pointer' }}
							>
								&nbsp;Make thread
							</i>
						</div>
						<div className="received_withd_msg">
							<span>
								<b>{message.name} :</b>
							</span>
							<p>{message.message}</p>
						</div>

						<div className={`thread-container ${message.id == this.state.currentthread ? '' : 'dn'}`}>
                                <ThreadComponent threads={this.state.threads} /> 
						</div>
					</div>
				</div>
			);
		});

		return template;
	}

	sendMessagehandler(id) {
		const payload = { channelid: id, newmessage: this.state.newmessage };
		this.props.sendMessage(payload);
		this.setState({ newmessage: '' });
	}

	render() {
		return (
			<div className="message-container">
				<div className="heading"> {this.state.messages.length} Message(s)</div>
				<hr />

				{(() => {

					if (this.state.currentChannel !== '') {
						return (
							<Fragment>
								<div className="messages">{this.rendertemplate()}</div>
								<div className="send-message-container">
									<div className="box">
										<input
											className="send-input"
											type="text"
											value={this.state.newmessage}
											placeholder="send your message"
											onChange={(e) => {
												this.setState({
													...this.state,
													newmessage: e.target.value
												});
											}}
										/>
										<a
											href="#"
											className="link-style"
											onClick={() => {
												this.sendMessagehandler(this.state.currentChannel);
											}}
										>
											Send
										</a>
									</div>
								</div>
							</Fragment>
						);
					}
				})()}
			</div>
		);
	}
}

export default MessageCenter;
