import React, { Component, Fragment, FormEvent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { userLogin } from '../../store/actions/slackAction';
import { bindActionCreators } from 'redux';
import { LOGGED_IN } from '../../static';

import '../../css/login.css';

class Login extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: null,
			password: null
		};
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	onLoginAction(e: FormEvent) {
		e.preventDefault();
		let loginData = { username: this.state.username, password: this.state.password };
		this.props.onLoginAction(loginData);
	}

	handleUserNameChange(e: any) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e: any) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<Fragment>
				{!(this.props.status === LOGGED_IN) && (
					<div className="login-container">
						<div className="wrapper">
							<div className="main-panel dark">
								<div className="content dark">
									<div className="registerpage">
										<section className="login-block">
											<div className="auth-wrapper">
												<div className="">
													<div className="form">
														<ul className="tab-group">
															<li className="tab active">
																<Link to="/signin">Log In</Link>
															</li>
															<li className="tab ">
																<Link to="/signup">Sign Up</Link>
															</li>
														</ul>
														<form
															name="loginForm"
															onSubmit={(e: FormEvent) => {
																this.onLoginAction(e);
															}}
														>
															<div className="tab-content">
																<div id="login">
																	<h2 className="text-center">
																		Login to your account!
																	</h2>

																	<div className="top-row">
																		<div className="field-wrap">
																			<input
																				type="text"
																				name="username"
																				placeholder="Username"
																				onChange={this.handleUserNameChange}
																				required
																			/>
																		</div>

																		<div className="field-wrap">
																			<input
																				type="password"
																				placeholder="Password"
																				name="password"
																				onChange={this.handlePasswordChange}
																				required
																			/>
																		</div>
																	</div>

																	<button
																		type="submit"
																		className="button button-block"
																	>
																		Log In
																	</button>
																</div>
															</div>
														</form>

														<p>
															Don't have an Account ?
															<Link to="/signup">
																<strong> Sign-up Now</strong>
															</Link>
														</p>
													</div>
												</div>
											</div>
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{this.props.status === LOGGED_IN && <Redirect to="/app/channel/general" />}
			</Fragment>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		token: state.loginReducer.token,
		status: state.loginReducer.status
	};
};

const mapActionsToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			onLoginAction: userLogin
		},
		dispatch
	);
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
