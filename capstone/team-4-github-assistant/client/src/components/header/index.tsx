import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
interface HeaderProps {
	title: String;
	history: any;
}

class Header extends Component<HeaderProps> {
	constructor(props: any) {
		super(props);
		this.onLogout = this.onLogout.bind(this);
	}

	onLogout() {
		document.cookie.split(';').forEach(function(c) {
			document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
		});
		this.props.history.push('/signin');
	}

	render() {
		return (
			<header>
				<div className="top-head left">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-3 col-12">
								<nav className="title float-left">Github Assistance</nav>
							</div>
							<div className="col-md-3 col-12" />
							<div className="col-md-6 col-12">
								<nav
									className="nav nav-inline float-right"
									onClick={() => {
										this.onLogout();
									}}
								>
									Logout
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default withRouter(Header);
