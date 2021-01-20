import React, { Component, Fragment, FormEvent, ChangeEvent } from 'react';
import { InputType } from 'zlib';
import { Link, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

import '../../css/login.css';

class Register extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			username: null,
			lastname: null,
			email: null,
			password: null,
			redirect: false
		};
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	componentWillUnmount(){
		this.setState({
			redirect: false
		})
	};

	onRegisterAction(e: FormEvent) {
		e.preventDefault();
		let Req: any = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...this.state })
		};
		fetch('/api/auth/register', Req)
			.then(
				(response: Response) => {
					return response.json();
				},
				(error: any) => {
					return error;
				}
			)
			.then((data) => {
				if (data.success) {
					alert(data.message);
					this.setState({
						redirect: true
					});
				} else {
					alert('Register failed');
				}
			});
	}

	handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ username: e.target.value });
	}
	handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ lastname: e.target.value });
	}
	handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ email: e.target.value });
	}
	handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<div className="register-container">
				{/*}<form onSubmit={(e:FormEvent)=>{this.onRegisterAction(e)}}>
					<div className='register-container_username'>
						<label>First name</label>
						<input type='text' name='username' required onChange={this.handleUserNameChange}/>
					</div>
					<div className='register-container_lastname'>
						<label>Last name</label>
						<input type='text' name='lastname' required onChange={this.handleLastNameChange}/>
					</div>
					<div className='register-container_email'>
						<label>Email</label>
						<input type='email' name='email' required onChange={this.handleEmailChange}/>
					</div>
					<div className='register-container_password'>
						<label>Password</label>
						<input type='password' name='password' required onChange={this.handlePasswordChange}/>
					</div>
					<input type='submit' value='Register'/>
				</form>  
		{ */}

				{ !(this.state.redirect) && <div className="wrapper">
					<div className="main-panel dark">
						<div className="content dark">
							<Fragment>
								<div className="registerpage">
									<section className="login-block">
										<div className="auth-wrapper">
											<div className="">
												<div className="form">
													<ul className="tab-group">
														<li className="tab ">
															<Link to="/signin">Log In</Link>
														</li>
														<li className="tab active">
															<Link to="/signup">Sign Up</Link>
														</li>
													</ul>

													<form
														onSubmit={(e: FormEvent) => {
															this.onRegisterAction(e);
														}}
													>
														<div id="signup">
															<h2 className="text-center">Sign up now</h2>

															<div className="top-row">
																<div className="field-wrap">
																	<input
																		placeholder="First Name"
																		type="text"
																		name="username"
																		required
																		onChange={this.handleUserNameChange}
																		autoComplete="off"
																	/>
																</div>

																<div className="field-wrap">
																	<input
																		type="text"
																		placeholder="Last Name"
																		required
																		name="lastname"
																		onChange={this.handleLastNameChange}
																		autoComplete="off"
																	/>
																</div>
															</div>

															<div className="field-wrap">
																<input
																	type="email"
																	placeholder="Email Address"
																	required
																	name="email"
																	onChange={this.handleEmailChange}
																	autoComplete="off"
																/>
															</div>

															<div className="field-wrap">
																<input
																	type="password"
																	placeholder="Set A Password"
																	required
																	name="password"
																	onChange={this.handlePasswordChange}
																	autoComplete="off"
																/>
															</div>

															<button type="submit" className="button button-block">
																Create Account
															</button>
														</div>
													</form>
													<p>
														Have already an account ?{' '}
														<Link to="/signin">
															<strong>Login Here</strong>
														</Link>
													</p>
												</div>
											</div>
										</div>
									</section>
								</div>
							</Fragment>
						</div>
					</div>
				</div>
			 }
			 {this.state.redirect && <Redirect to="/signin"/>}
			 </div>
		);
	}
}

export default Register;
