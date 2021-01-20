import React, { Component } from 'react';
import '../../css/header.css';
import { Link } from 'react-router-dom';

interface HeaderProps {
	title: String;
}

class Header extends Component<HeaderProps> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<header>
				<Link to={`/`} className="header-title">
					{this.props.title || `Board Trello`}{' '}
				</Link>
				<div className="header-right-side">
					<a className="signout-link" href="#">
						&nbsp;Sign in
					</a>
				</div>
			</header>
		);
	}
}

export default Header;
