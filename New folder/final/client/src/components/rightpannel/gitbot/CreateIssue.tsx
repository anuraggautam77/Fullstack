import React, { Component, Fragment } from 'react';

const initialState = {
	title: '',
	body: '',
	url: '',
	label: ''
};

class OpenIssue extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			...initialState
		};
		this.handleChange = this.handleChange.bind(this);
		this.createIssueHandler = this.createIssueHandler.bind(this);
	}

	handleChange(event: any) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState({
			[name]: value
		});
	}
	clearState() {
		this.setState({ ...initialState });
	}

	createIssueHandler(e: any) {
		e.preventDefault();
		if (this.state.title !== '' && this.state.url !== '') {
			this.props.saveClick(this.state);
		}
	}

	render() {
		const { title, body, url } = this.state;

		return (
			<Fragment>
				<form onSubmit={this.createIssueHandler}>
					<div className="card" style={{ width: '100%' }}>
						<div className="card-header">
							<i className="fa fa-github" aria-hidden="true" />
							<strong> &nbsp; Open a New Issue </strong>
						</div>
						<div className="card-body">
							<div className="form-group">
								<label>Repository Url</label>
								<input
									type="text"
									className="form-control"
									name="url"
									value={url}
									onChange={this.handleChange}
									placeholder="Repo URL"
								/>
							</div>
							<div className="form-group">
								<label>Title</label>
								<input
									type="text"
									className="form-control"
									name="title"
									value={title}
									onChange={this.handleChange}
									placeholder="Title of issue"
								/>
							</div>
							<div className="form-group">
								<label>Body</label>
								<textarea
									className="form-control"
									name="body"
									onChange={this.handleChange}
									value={body}
									placeholder="Leave a comment"
								/>
							</div>
							<div className="form-group">
								<label>Label(Optional)</label>
								<select name="label" className="form-control" onChange={this.handleChange}>
									<option value="bug">Bug</option>
									<option value="duplicate">Duplicate</option>
									<option value="enhancement">Enhancement</option>
								</select>
							</div>
							<button type="submit" className="btn btn-primary">
								Open
							</button>
							&nbsp;
							<button
								type="button"
								onClick={() => {
									this.props.closewindow();
								}}
								className="btn btn-default"
							>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</Fragment>
		);
	}
}

export default OpenIssue;
