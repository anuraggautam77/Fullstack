import React, { Component, Fragment } from 'react';

import '../../css/home.css';

import BoardComponent from './Board';

class BoardListComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			boards: [
				{
					id: 11,
					title: 'Board One'
				},
				{
					id: 22,
					title: 'Board Two'
				}
			]
		};

		this.addnewboardHandler = this.addnewboardHandler.bind(this);
	}

	addnewboardHandler() {
		let boardname = this.refs.boardname.value;
		if (boardname !== '') {
			this.setState(
				{
					boards: [ ...this.state.boards, { id: (Math.random() * 121212232197).toFixed(), title: boardname } ]
				},
				() => {
					this.refs.boardname.value = '';
				}
			);
		}
	}

	updateBoard(boardid, text) {
		this.setState({
			boards: [
				...this.state.boards.map((board) => {
					if (board.id == boardid) {
						board.title = text;
					}
					return board;
				})
			]
		});
	}

	renderboardlist() {
		const template = this.state.boards.map((board, i) => {
			return (
				<BoardComponent board={board} key={board.id} updateBoard={(id, text) => this.updateBoard(id, text)} />
			);
		});
		return template;
	}

	render() {

		return (
			<Fragment>
				<div className="home">
					<div className="main-content">
						<h1>board List</h1>
						<div className="boards">
							{this.renderboardlist()}

							<div className="add-board-container">
								<input type="text" ref="boardname" />
								<button className="add-board-button" onClick={this.addnewboardHandler}>
									Add a new board...
								</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default BoardListComponent;
