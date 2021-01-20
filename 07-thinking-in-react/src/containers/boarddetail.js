import React, { Component } from 'react';

import Header from '../components/header';
import ListComponent from '../components/trello/List';

class BoardDetail extends Component {

	render() {
		return (
			<div className="header-section">
				<Header />
				<ListComponent />
			</div>
		);
	}
}

export default BoardDetail;
