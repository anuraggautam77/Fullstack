import React, { Component, Fragment } from 'react';

import LeftPanel from '../components/leftpannel';
import RightPanel from '../components/rightpannel';

import '../css/slack.scss';

interface ApplicataionProps {}

export default class Application extends Component<ApplicataionProps> {
	render() {
		return (
			<Fragment>
				<div className="app-layout">
					<LeftPanel />
					<RightPanel />
				</div>
			</Fragment>
		);
	}
}
