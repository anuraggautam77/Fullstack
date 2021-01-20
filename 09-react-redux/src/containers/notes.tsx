import React, { Component } from 'react';
import Header from '../components/header';
import Listing from '../components/todo';

import '../css/notes.css';

class Notes extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div className="header-section">
				<Header title="TODO APP" />
				<Listing />
			</div>
		);
	}
}

export default Notes;
