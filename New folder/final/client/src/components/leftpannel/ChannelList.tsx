import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getChannels, addNewChannel } from '../../store/actions/slackAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class ChannelList extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			channelname: null
		};
		this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
	}

	componentDidMount() {
		this.props.onLoadChannels();
	}

	handleChannelNameChange(e: any) {
		this.setState({ channelname: e.target.value });
	}

	onAddChannel(e: any) {
		e.preventDefault();
		this.props.onAddChannel({ title: this.state.channelname });
	}

	render() {
		return (
			<Fragment>
				<div id="contacts" className="chat-channel">
					<div className="channelform">
						<form
							name="loginForm"
							onSubmit={(e: any) => {
								this.onAddChannel(e);
							}}
						>
							<div className="field-wrap">
								<input
									type="text"
									name="channelname"
									placeholder="Channel"
									onChange={this.handleChannelNameChange}
									required
								/>
								<input type="submit" value="add" />
							</div>
						</form>
					</div>
					<div className="channel-list">
						{this.props.channels.length &&
							this.props.channels.map((item: any, i: number) => (
								<div className="chat-channel-item" key={i}>
									<div>
										<Link to={`/app/channel/${item.channelId}`}>{item.title}</Link>
									</div>
								</div>
							))}
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		channels: state.slackReducer.channels
	};
};

const mapActionsToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			onLoadChannels: getChannels,
			onAddChannel: addNewChannel
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapActionsToProps)(ChannelList);
