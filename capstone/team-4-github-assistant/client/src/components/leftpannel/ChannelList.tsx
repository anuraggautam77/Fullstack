import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getChannels, addNewChannel, editChannel, addUserToChannel } from '../../store/actions/slackAction';
import { bindActionCreators } from 'redux';
import Modal from 'react-modal';
import Select from 'react-select';
import { connect } from 'react-redux';
const customStyles = {
	content: {
		top: '30%',
		left: '40%',
		right: 'auto',
		bottom: 'auto',
		width: '30%',
		zIndex: 999999999999999
	}
};

const customStylesAddUser = {
	content: {
		top: '30%',
		left: '40%',
		right: 'auto',
		bottom: 'auto',
		zIndex: 999999999999999,
		height: '40%'
	}
};

const customStylesSelect = {
	option: (provided, state) => ({
		...provided,
		borderBottom: '1px dotted pink',
		color: state.isSelected ? 'red' : 'blue'
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	}
};
class ChannelList extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			channelname: null,
			modalIsOpen: false,
			editedChannel: null,
			selectedChannel: null,
			selectedUsers: null
		};
		this.handleChannelNameChange = this.handleChannelNameChange.bind(this);
		this.modalOpen = this.modalOpen.bind(this);
		this.addUserModalOpen = this.addUserModalOpen.bind(this);
		this.handleUsersChange = this.handleUsersChange.bind(this);
		this.closewindow = this.closewindow.bind(this);
	}

	componentDidMount() {
		this.props.onLoadChannels();
	}

	handleChannelNameChange(e: any) {
		this.setState({ channelname: e.target.value });
	}

	onActionChannel(e: any, type: string) {
		e.preventDefault();
		if (type === 'ADD') {
			this.props.onAddChannel({ title: this.state.channelname });
		} else {
			this.props.onEditChannel({
				channelId: this.state.editedChannel.channelId,
				newTitle: this.state.channelname
			});
		}
	}

	addUsersToChannel(e: any) {
		e.preventDefault();
		this.props.onAddUser({
			channelId: this.state.selectedChannel.channelId,
			usersList: this.state.selectedUsers.map((item) => item.value)
		});
	}

	modalOpen() {
		this.setState({
			modalIsOpen: true,
			editedChannel: null,
			channelname: ''
		});
	}

	handleUsersChange = (selectedUsers) => {
		this.setState({ selectedUsers });
		console.log(`Option selected:`, selectedUsers);
	};

	addUserModalOpen(item: any) {
		this.setState({
			addUserModalIsOpen: true,
			selectedChannel: item
		});
	}

	closewindow() {
		this.setState({
			modalIsOpen: false,
			addUserModalIsOpen: false
		});
	}

	editChannelAction(item: any) {
		this.setState({
			modalIsOpen: true,
			editedChannel: item,
			channelname: item.title
		});
	}

	render() {
		return (
			<Fragment>
				<div className="chat-channel">
					<div className="chat-channel-name">
						<div style={{ width: '80%', float: 'left' }}>
							<h5>Channels ({this.props.channels.length})</h5>
						</div>
						<div style={{ float: 'right' }}>
							<i
								className="fa fa-plus-circle"
								onClick={() => {
									this.modalOpen();
								}}
								aria-hidden="true"
							/>
						</div>
					</div>
					<div className="channel-list">
						{this.props.channels.length &&
							this.props.channels.map((item: any, i: number) => (
								<div className="chat-channel-item" key={i}>
									<div>
										<i className="fa fa-users" aria-hidden="true" />
										&nbsp;{' '}
										<Link to={`/app/channel/${item.channelId}`}>
											{item.title} &nbsp;({item.members.length})
										</Link>
										<div style={{ fontSize: '15px', float: 'right' }}>
											<i
												className="fa fa-edit"
												aria-hidden="true"
												onClick={() => {
													this.editChannelAction(item);
												}}
											/>
											&nbsp;
											<i
												className="fa fa-user"
												onClick={() => {
													this.addUserModalOpen(item);
												}}
												aria-hidden="true"
											/>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
				<Modal isOpen={this.state.modalIsOpen} style={customStyles}>
					<div className="channelform">
						<form
							name="loginForm"
							onSubmit={(e: any) => {
								let TYPE = this.state.editedChannel ? 'EDIT' : 'ADD';
								this.onActionChannel(e, TYPE);
								this.closewindow();
							}}
						>
							<div
								className="card"
								style={{ width: '100%', color: '#fff', background: 'rgb(82, 54, 78)' }}
							>
								<div className="card-header">
									<strong> &nbsp; Add New Channel </strong>
								</div>
								<div className="card-body">
									<div className="form-group">
										<input
											type="text"
											name="channelname"
											placeholder="Channel Name"
											onChange={this.handleChannelNameChange}
											value={this.state.channelname}
											required
										/>
									</div>
									<button type="submit" className="btn btn-sm btn-success">
										{this.state.editedChannel ? 'Edit Channel' : 'Add Channel'}
									</button>
									&nbsp;
									<button
										type="button"
										onClick={() => {
											this.closewindow();
										}}
										className="btn btn-sm btn-info"
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
				</Modal>

				<Modal isOpen={this.state.addUserModalIsOpen} style={customStylesAddUser}>
					<div className="channelform">
						<form
							name="addUserForm"
							className="user-addform"
							onSubmit={(e: any) => {
								this.addUsersToChannel(e);
								this.closewindow();
							}}
						>
							<div
								className="card"
								style={{ width: '100%', color: '#fff', background: 'rgb(82, 54, 78)' }}
							>
								<div className="card-header">
									{this.state.selectedChannel && (
										<strong> &nbsp; Add Users to {this.state.selectedChannel.title} </strong>
									)}
								</div>
								<div className="card-body">
									<div className="form-group">
										<Select
											value={this.state.selectedUsers}
											onChange={this.handleUsersChange}
											options={this.props.userLists}
											styles={customStylesSelect}
											isMulti={true}
										/>
									</div>
									<button type="submit" className="btn btn-sm btn-success">
										{' '}
										Add Users
									</button>
									&nbsp;
									<button
										type="button"
										onClick={() => {
											this.closewindow();
										}}
										className="btn btn-sm btn-info"
									>
										Cancel
									</button>
								</div>
							</div>
						</form>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any) => {
	console.log(state.slackReducer.channels);
	return {
		channels: state.slackReducer.channels,
		userLists: state.gitHubReducer.gitHubUser.map((item) => {
			return { label: item.username, value: item._id };
		})
	};
};

const mapActionsToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			onLoadChannels: getChannels,
			onAddChannel: addNewChannel,
			onEditChannel: editChannel,
			onAddUser: addUserToChannel
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapActionsToProps)(ChannelList);
