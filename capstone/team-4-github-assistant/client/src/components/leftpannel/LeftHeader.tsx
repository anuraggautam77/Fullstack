import React, { Component, Fragment } from 'react';

class LeftHeader extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render() {
		return <div className="channels channels-dark box dn">User / Channels List</div>;
	}
}

export default LeftHeader;
