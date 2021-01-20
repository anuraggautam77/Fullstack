import React, { Component, Fragment } from 'react';

class GitSign extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<div className="card">
					<div className="card-body">
						<h4>
							<i className="fa fa-github" aria-hidden="true" />
							&nbsp; Github login
						</h4>
						<div className="bd-callout bd-callout-warning">
							<span>Finish connecting your GitHub account:</span>
							<br />
							<a href="/api/auth/login/github" className="btn btn-sm btn-secondary">
								Connect Github Account
							</a>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default GitSign;
