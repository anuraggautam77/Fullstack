import React, { Component, Fragment } from 'react';

class GitHelp extends Component<any, any> {
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
							&nbsp; Github Assistance 
						</h4>

						<div className="bd-callout bd-callout-warning">
							<span>Connect your GitHub account:</span>
							<br />
							<span className="alert alert-secondary" role="alert">
								/github signin
							</span>
						</div>

						<div className="bd-callout bd-callout-warning">
							<span>Show this help message:</span>
							<br />
							<span className="alert alert-secondary" role="alert">
								/github help
							</span>
						</div>

						<div className="bd-callout bd-callout-warning">
							<span>Create a Create Repo:</span>
							<br />
							<span className="alert alert-secondary" role="alert">
								/github createrepo
							</span>
						</div>

						<div className="bd-callout bd-callout-warning">
							<span>Add user in Repo:</span>
							<br />
							<span className="alert alert-secondary" role="alert">
								/github adduser [reponame]
							</span>
						</div>

						<div className="bd-callout bd-callout-warning">
							<span>Create a new issue:</span>
							<br />
							<span className="alert alert-secondary" role="alert">
								/github open [reponame]
							</span>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default GitHelp;
