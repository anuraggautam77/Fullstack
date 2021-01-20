import React, { Component, Fragment } from 'react';

class InvitationDetail extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		console.log(this.props.details.invitation);
		const { invitation, invitee, inviter, repodetail } = this.props.details.invitation;

		return (
			<Fragment>
				<div className="col-sm-12 col-md-8">
					<div className="message-block">
						<div>
							<img src={`${window.location.origin}/img/github.png`}   alt="gitbot" />
						</div>
						<div className="card">
							<div className="firstinfo text-left list-group-item">
								<div className="profileinfo">
									<h5>
										Invitation for adding new user in &nbsp;
										<a href={repodetail.html_url} target="_blank">
											<strong>{repodetail.name}</strong>
										</a>
									</h5>
									<hr />
									<small>
										<p className="mb-1">
											<strong>Send to: &nbsp; </strong>
											<a href={invitation} style={{ textDecoration: 'none' }} target="_blank">
												&nbsp;{invitee.login}
											</a>
										</p>
									</small>
									<small>
										<strong>Added by: &nbsp; </strong>
										&nbsp; {inviter.login}
									</small>
									<br />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default InvitationDetail;
