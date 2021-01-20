import React, { Component } from 'react';

class ChannelComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channels: props.list
		};
		this.channelAddHandler = this.channelAddHandler.bind(this);
	}

	channelList() {
		const template = this.state.channels.map((channel, i) => {
			return (
				<li
					onClick={() => {
						this.props.channelclick(channel.id);
					}}
					key={i}
				>
					#{channel.name}
				</li>
			);
		});
		return template;
	}

	channelAddHandler() {
		let channelname = this.refs.channelName.value;
		if (channelname !== '') {
			this.setState(
				{
					channels: [
						...this.state.channels,
						{ id: (Math.random * 324324234).toFixed(), name: channelname, members: [] }
					]
				},
				() => {
					this.refs.channelName.value = '';
				}
			);
		}
	}

	render() {
		return (
			<div className="channels" id="channels">
				<h4 className="channel-heading">Channels</h4>
				<ul id="channellist">{this.channelList()}</ul>
				<div className="channel-add-container">
					<input type="text" ref="channelName" className="channel-input" placeholder="Channel Name" />
					<br />
					<a href="javascript:void(0)" className="add-channelbtn" onClick={this.channelAddHandler}>
						Add Channel
					</a>
				</div>
			</div>
		);
	}
}

export default ChannelComponent;
