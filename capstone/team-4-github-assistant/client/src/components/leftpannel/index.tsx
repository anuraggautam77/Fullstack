import React, { Component, Fragment } from 'react';
import LeftHeader from './LeftHeader';
import UserList from './UserList';
import ChannelList from './ChannelList';
import LeftFooter from './LeftFooter';

class LeftPanel extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Fragment>
				<LeftHeader />
				<div className="channels channels-dark ">
					<ChannelList />
					<UserList />
				</div>
				<LeftFooter />
			</Fragment>
		);
	}
}

export default LeftPanel;
