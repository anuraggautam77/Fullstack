import React, { Component } from 'react';

class CardComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentcard: '',
			currentCardTitle: '',
			currentCarddetail: ''
		};
	}

	style = {
		zIndex: '100',
		position: 'absolute',
		right: '9px'
	};

	editCardHandler(card) {
		this.setState({
			currentcard: card.id,
			currentCardTitle: card.title,
			currentCarddetail: card.detail
		});
    }
    

    updateCardHandler(id){
        const payload ={id:id,title:this.state.currentCardTitle, detail:this.state.currentCarddetail};
        this.props.updateCard(payload);
        this.setState({
			currentcard: '',
			currentCardTitle: '',
			currentCarddetail: ''
		});

    }

	render() {
		const { title, detail, id } = this.props.carddata;

		return (
			<div>
				<div className={`card ${this.state.currentcard === id ? 'dn' : ''}`}>
					<div className="card-title"> {title}</div>
					<div className="card-detail"> {detail}</div>
					<br />
					<button
						type="btn btn-sm btn-primary"
						onClick={() => {
							this.editCardHandler(this.props.carddata);
						}}
					>
						Edit
					</button>
				</div>

				<div className={`card ${this.state.currentcard === id ? '' : 'dn'}`}>
					<input
						placeholder="Title"
						type="text"
						value={this.state.currentCardTitle}
						ref={`title_${this.props.carddata.id}`}
						onChange={(e) => {
							this.setState({ currentCardTitle: e.target.value });
						}}
					/>
					<br />
					<input
						placeholder="Detail"
						type="text"
						onChange={(e) => {
							this.setState({ currentCarddetail: e.target.value });
						}}
						value={this.state.currentCarddetail}
						ref={`detail_${id}`}
					/>
					<br />
					<button
						type="btn btn-sm btn-sm-primary"
						onClick={() => {
							this.updateCardHandler(id);
						}}
					>
						Update
					</button>
				</div>
			</div>
		);
	}
}

export default CardComponent;
