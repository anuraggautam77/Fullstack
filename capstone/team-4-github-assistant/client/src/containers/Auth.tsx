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
				<header>
					<div className="top-head left">
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-3 col-12">
									<nav className="title float-left">Github Assistance</nav>
								</div>
								<div className="col-md-3 col-12" />
							</div>
						</div>
					</div>
				</header>
				<div className="tab_container">
					<Login />
				</div>
			</div>
		);
	}
}

export default Auth;
