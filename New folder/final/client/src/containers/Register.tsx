import React, { Component } from 'react';

import Register from '../components/register';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

interface IAuthProps {}

interface IAuthState {
	login: boolean;
	register: boolean;
}

class RegisterContainer extends Component<IAuthProps, IAuthState> {
	constructor(props: any) {
		super(props);
		this.state = {
			login: true,
			register: false
		};
	}

	render() {
		return (
			<div id="tab">
				<div className="tab_container">
					<Register />
				</div>
				<div>
					<Link to="/app">Slackkkk</Link>
				</div>
			</div>
		);
	}
}

export default RegisterContainer;
