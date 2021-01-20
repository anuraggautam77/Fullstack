import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class BoardComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			 dn: 'dn',
            currentBoard: '',
            currentBoardName:''
		};
	}

	editBoardHandler(id,text) {
		this.setState({
            currentBoard: id,
            currentBoardName:text
		});
	}

    updateBoardHandler(id){

        this.props.updateBoard(id,this.state.currentBoardName);

        this.setState({
            currentBoard: '',
            currentBoardName:''
		});
    }
     
	render() {
		return (
			<Fragment>
				<div className="board-link blue">
					
					<div className={`updateContiner ${this.state.currentBoard === this.props.board.id ? '' : this.state.dn} `} >
                        <input type="text" ref="boardname"
                         value={this.state.currentBoardName} 
                        onChange={(e)=>{  
                                this.setState({
                                    ...this.state,
                                    currentBoardName:e.target.value
                                })
                             
                            }}/>
						<button className="add-board-button" onClick={() => { this.updateBoardHandler(this.props.board.id); }}>Update Board</button>
					</div>
                    <div className={`edit-btn-container ${this.state.currentBoard === this.props.board.id ? this.state.dn: ''}  `}>
                        
                    <div className="board-link-title">{this.props.board.title}</div>
                    <button className="add-board-button red" onClick={() => { this.editBoardHandler(this.props.board.id,this.props.board.title); }}> Edit Board </button>
						<Link className="add-board-button" to={`/trello/detail`} key={this.props.board.id}>
							View Board
						</Link>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default BoardComponent;
