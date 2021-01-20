import React, { Component, Fragment } from 'react';

class ChatMessage extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return <p>{this.props.item.message}</p>;
	}
}

export default ChatMessage;
