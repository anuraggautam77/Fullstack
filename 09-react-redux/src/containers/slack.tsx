import React, { Component, Fragment } from 'react';

import '../css/slack.css';
import Header from '../components/header';
import Channel from '../components/slack/ChannelList';
import DirectList from '../components/slack/DirectList';
import MessageCenter from '../components/slack/MessageCenter';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getChannelMessgae, addNewChannel, addNewMessage, deleteMessage } from '../actions/SlackActions';

class Slack extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			currentChannelid: ''
		};
	}

	componentWillReceiveProps(newprops: any) {
		//  console.log(newprops);
	}

	channelClickHandler(id: any) {
		this.getMessage('C', id);
		this.setState({ currentChannelid: id });
		this.props.getChannelMessgae({ channelid: id });
	}

	newChannelClickHandler(payload: any) {
		this.props.addnewChannel(payload);
	}

	userClickhandler(id: any) {
		this.getMessage('U', id);
	}

	getMessage(type: string, id: any) {
		//  console.log(type);
		//console.log(id);
	}

	deleteMessage(id: any) {
		this.props.deleteMessage({ id: id, channelid: this.state.currentChannelid });
	}

	addNewMessageClickHandler(obj: any) {
		obj.channelid = this.state.currentChannelid;
		this.props.addNewMessage(obj);
	}

	render() {
		const { slack } = this.props;
		console.log(slack);
		return (
			<Fragment>
				<Header title={'Slack Demo'} />
				<div className="body">
					<section className="main-container">
						<div className="app-layout">
							<div className="left-panel panel">
								<Channel
									list={slack.channels}
									channelclick={(id: any) => {
										this.channelClickHandler(id);
									}}
									channelAddHandler={(payload: any) => {
										this.newChannelClickHandler(payload);
									}}
								/>
								<DirectList
									list={slack.users}
									userClick={(id: any) => {
										this.userClickhandler(id);
									}}
								/>
							</div>
							<div className="right-panel panel">
								{(() => {
									if (slack.newMessages) {
										return (
											<MessageCenter
												sendMessage={(obj: any) => {
													this.addNewMessageClickHandler(obj);
												}}
												messageDetele={(id: any) => {
													this.deleteMessage(id);
												}}
												messages={slack.newMessages}
											/>
										);
									}
								})()}
							</div>
						</div>
					</section>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state: any) {
	return { slack: state.slackReducer };
}

function mapDispatchToProps(dispatch: any) {
	return {
		getChannelMessgae: (payload: any) => dispatch(getChannelMessgae(payload)),
		addnewChannel: (payload: any) => dispatch(addNewChannel(payload)),
		addNewMessage: (payload: any) => dispatch(addNewMessage(payload)),
		deleteMessage: (payload: any) => dispatch(deleteMessage(payload))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Slack);
