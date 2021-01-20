import React, { Component, Fragment } from 'react';

const initialState = {
	title: '',
	body: '',
	loader: 'd-none',
	formShow: ''
};

class CreateRepo extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			...initialState
		};

		this.handleChange = this.handleChange.bind(this);
		this.createRepoHandler = this.createRepoHandler.bind(this);
	}

	handleChange(event: any): void {
		const name = event.currentTarget.name;
		const value = event.currentTarget.value;
		this.setState({
			[name]: value
		});
	}
	clearState() {
		this.setState({ ...initialState });
	}

	createRepoHandler(e: any) {
		e.preventDefault();
		if (this.state.title !== '') {
			this.props.saveClick(this.state);
			this.setState({
				formShow: 'd-none',
				loader: ''
			});
		}
	
	}

	render() {
		const { title, body } = this.state;

		return (
			<Fragment>
				<div className={`${this.state.loader}`} style={{ width: '100%', textAlign: 'center' }}>
					<img src={`${window.location.origin}/img/loader.gif`} />
				</div>
				<form className={`${this.state.formShow}`} onSubmit={this.createRepoHandler}>
					<div className="card" style={{ width: '100%' }}>
						<div className="card-header">
							<i className="fa fa-github" aria-hidden="true" />
							<strong> &nbsp; Create a New Repository </strong>
						</div>
						<div className="card-body">
							<div className="form-group">
								<label>Title</label>
								<input
									type="text"
									className="form-control"
									name="title"
									value={title}
									placeholder="Repo-Name"
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label>Description</label>
								<textarea
									className="form-control"
									name="body"
									value={body}
									placeholder="Description"
									onChange={this.handleChange}
								/>
							</div>
							<button type="submit" className="btn btn-primary">
								Create Repository
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

export default CreateRepo;
