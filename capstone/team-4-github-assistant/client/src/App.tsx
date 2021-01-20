import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './containers/Auth';
import RegisterContainer from './containers/Register';
import { LOGGED_IN } from './static';
import SlackNew from './containers/';
import './css/home.css';

function getCookie(cname: String) {
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

function PrivateRoute({ component: Component, authed, ...rest }: any) {
	return (
		<Route
			{...rest}
			render={(props) => (authed === true ? <Component {...props} /> : <Redirect to={{ pathname: '/signin' }} />)}
		/>
	);
}
class App extends Component<any, any> {
	static isLoggedIn: Boolean;
	constructor(props: any) {
		super(props);
		App.isLoggedIn = getCookie('username').length > 0 ? true : false;
	}
	render() {

		return (
			<Fragment>
				<Router>
					<Switch>
						<Route exact path="/" component={Auth} />
						<Route exact path="/signin" component={Auth} />
						<Route exact path="/signup" component={RegisterContainer} />
						<PrivateRoute
							authed={App.isLoggedIn || this.props.status === LOGGED_IN}
							path="/app/channel/:channelId"
							component={SlackNew}
						/>
						<PrivateRoute
							authed={App.isLoggedIn || this.props.status === LOGGED_IN}
							path="/app/user/:userId"
							component={SlackNew}
						/>

						{(App.isLoggedIn || this.props.status === LOGGED_IN) && (
							<Redirect
								to={{
									pathname: '/app/channel/0'
								}}
							/>
						)}
					</Switch>
				</Router>
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any, props: any) => {
	return {
		token: state.loginReducer.token,
		status: state.loginReducer.status
	};
};

export default connect(mapStateToProps, null)(App);
