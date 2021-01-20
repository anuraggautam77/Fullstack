import React, { Component } from 'react';
import Login from '../components/login';
import Register from '../components/register';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

interface IAuthProps {}

interface IAuthState {}

class Auth extends Component<IAuthProps, IAuthState> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div id="tab">
				<div className="tab_container">
					<Login />
				</div>
				<div>
					<Link to="/app">Slack</Link>
				</div>
			</div>
		);
	}
}

export default Auth;
