import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ThreadComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			threads: props.threads
        };
        this.threadListing= this.threadListing.bind(this);
	}

	componentWillReceiveProps(newprops) {
		this.setState({
			threads: newprops.threads
		});
	}

	threadListing() {
		const threadList=this.state.threads.map((message) => {
                return (
                    <div className="incoming_msg bgcolor">
						<div className="incoming_msg_img">
							<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
						</div>
						<div className="received_msg">
							<div className="received_withd_msg">
								<p>{message.message} </p>
							</div>
						</div>
					</div>
                )
        });
        return threadList;
	}

	render() {
		return (
			<Fragment>
				<div className="messages bordercolor">
                        {this.threadListing()}
				</div>

				<div className="panel-footer">
					<div className="input-group">
						<input type="text" className="" placeholder="Type your message here..." />
						<span className="input-group-btn">
							<button className="btn btn-warning btn-sm"> Send</button>
						</span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ThreadComponent;
