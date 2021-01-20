import React, { Component, Fragment } from 'react';

class RepositoryDetail extends Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { reponame, repo_url, owner, description } = this.props.details;
		return (
			<Fragment>
				<div className="col-sm-12 col-md-8">
					<div className="card">
						<div className="firstinfo list-group-item text-left">
							<div className="profileinfo">
								<h5>
									<i className="fa fa-github" aria-hidden="true" />
									&nbsp; New Repository Created !
								</h5>
								<hr />
								<small>
									<p className="mb-1">
										<strong>Repository Name: &nbsp;</strong>
										<a href={repo_url} target="_blank">
											&nbsp;{reponame}
										</a>
									</p>
								</small>
								<small>
									<strong>Description: &nbsp; </strong>
									&nbsp;{description}
								</small>
								<br />
								<small>
									<strong>Created by:</strong>
									<a href={owner.html_url} target="_blank">
										&nbsp; {owner.login}
									</a>
									<img src={owner.avatar_url} />
								</small>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default RepositoryDetail;
