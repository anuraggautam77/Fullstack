import React, { Component, Fragment } from 'react';

import Header from '../header';
import ChannelComponent from './ChannelList';
import DirectUserComponent from './DirectUserList';
import MessageCenter from './MessageCenter';

import _ from 'lodash';
import '../../css/slack.css';
import jsonData from '../../data/slack.json';

class SlackComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: jsonData.messages,
			users: jsonData.users,
			channels: jsonData.channels,
			newMessage: [],
			currentChannel: '',
			threads:jsonData.threads
		};
	}

	channelClickHandler(id) {
		this.getMessage('C', id);
		let getMessage = _.filter(this.state.messages, { channelid: id });

		_.forEach(getMessage, (obj) => {
			let arruser = _.filter(this.state.users, { id: obj.userid });
			if (arruser.length > 0) {
				obj.name = arruser[0].name;
			}
		});
		this.setState({
			...this.state,
			newMessage: [ ...getMessage ],
			currentChannel: id
		});
	}

	getCurrentMessage(id) {}

	userclickhandler(id) {
		this.getMessage('U', id);
	}

	getMessage(type, id) {}

	sendMessage(payload) {
		const allmessage = [
			...this.state.messages,
			{
				id: (Math.random() * 121212232197).toFixed(),
				message: payload.newmessage,
				channelid: payload.channelid,
				userid: 1
			}
		];

		const getMessage = _.filter(allmessage, { channelid: payload.channelid });
		_.forEach(getMessage, (obj) => {
			let arruser = _.filter(this.state.users, { id: obj.userid });
			if (arruser.length > 0) {
				obj.name = arruser[0].name;
			}
		});

		this.setState({
			...this.state,
			messages: allmessage,
			newMessage: getMessage
		});
 

	}

	render() {
		return (
			<Fragment>
				<Header title={'Slack Demo'} />
				<div className="body">
					<section className="main-container">
						<div className="app-layout">
							<div className="left-panel panel">
								<ChannelComponent
									list={jsonData.channels}
									channelclick={(id) => {
										this.channelClickHandler(id);
									}}
								/>
								<DirectUserComponent
									list={jsonData.users}
									userClick={(id) => {
										this.userclickhandler(id);
									}}
								/>
							</div>
							<div className="right-panel panel">
								<MessageCenter
								threads={this.state.threads}
									messages={this.state.newMessage}
									currentChannel={this.state.currentChannel}
									sendMessage={(payload) => {
										this.sendMessage(payload);
									}}
								/>
							</div>
						</div>
					</section>
				</div>
			</Fragment>
		);
	}
}

export default SlackComponent;
