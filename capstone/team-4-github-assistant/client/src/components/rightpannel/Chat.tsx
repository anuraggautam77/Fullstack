import React, { Component, Fragment } from 'react';

class ChatMessage extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="message-block">
				<img src={`${window.location.origin}/img/user.jpg`}  alt="userlogo"/>
				<div className="bubble">
					<div className="float-left username">
						<p>
							<strong>{this.props.item.senderId}</strong>
						</p>
					</div>
					<div className="action-container float-right">
						<div style={{ fontSize: '20px', float: 'left' }}>
							{/*}<i className="fa fa-edit" aria-hidden="true" />{*/}
						</div>
						<div style={{ paddingLeft: '10px', fontSize: '20px', float: 'right' }}>
							{/*}	<i className="fa fa-trash" aria-hidden="true" /> {*/}
						</div>
					</div>
					<br />
					<p className="messageDetail">{this.props.item.message}</p>
				</div>
			</div>
		);

		return <p />;
	}
}

export default ChatMessage;
