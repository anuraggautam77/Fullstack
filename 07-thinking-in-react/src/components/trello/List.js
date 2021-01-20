import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import '../../css/listandcard.css';
import CardComponent from './Card';

class ListComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lists: [
				{
					id: '11221',
					title: 'TO DO'
				},
				{
					id: '111121',
					title: 'INPROGRESS'
				},
				{
					id: '1121221',
					title: 'DONE'
				}
			],
			cards: [
				{
					id: '76869',
					title: 'task1',
					detail: 'Details of task1',
					listid: '11221'
				},
				{
					id: 'qwewqewq',
					title: 'task7',
					detail: 'Details of task7',
					listid: '11221'
				},
				{
					id: '4324234',
					title: 'task2',
					detail: 'Details of task2',
					listid: '111121'
				},
				{
					id: '8768',
					title: 'task3',
					detail: 'Details of task3',
					listid: '1121221'
				}
			],

			currentList: '',
			currentListText: '',
			currentCard: '',
			currentCardText: ''
		};

		this.addNewlistHandler = this.addNewlistHandler.bind(this);
		this.addnewCardhandler = this.addnewCardhandler.bind(this);
	}

	rendercardlist(id) {
		let newarry = _.filter(this.state.cards, { listid: id });
		const listRenderTemplate = newarry.map((card, i) => {
			return (
				<CardComponent
					carddata={card}
					key={i}
					updateCard={(payload) => {
						this.updateCard(payload);
					}}
				/>
			);
		});

		return listRenderTemplate;
	}

	updateCard(payload) {
		this.setState({
			...this.state,
			cards: this.state.cards.map((card) => {
				if (card.id === payload.id) {
					card.title = payload.title;
					card.detail = payload.detail;
				}
				return card;
			})
		});
	}

	updateListHandler(id) {
		this.setState({
			...this.state,

			lists: this.state.lists.map((list) => {
				if (list.id === id) {
					list.title = this.state.currentListText;
				}
				return list;
			}),
			currentList: '',
			currentListText: ''
		});
	}

	editListHandler(id, text) {
		this.setState({
			...this.state,
			currentList: id,
			currentListText: text,
			currentCard: '',
			currentCardText: ''
		});
	}

	listRender() {
		const listRenderTemplate = this.state.lists.map((list, i) => {
			return (
				<span key={i}>
					<div className="single-list">
						<div className={`list-title ${this.state.currentList === list.id ? 'dn' : ''}`}>
							<span>{list.title}</span>{' '}
							<i
								onClick={() => {
									this.editListHandler(list.id, list.title);
								}}
								className="fa fa-edit editfloat"
							/>
						</div>
						<div className={`list-title ${this.state.currentList === list.id ? '' : 'dn'}`}>
							<input
								className="input"
								value={this.state.currentListText}
								placeholder="title"
								ref={`listname_${list.id}`}
								style={{ width: '90%' }}
								onChange={(e) => {
									this.setState({ ...this.state, currentListText: e.target.value });
								}}
								type="text"
							/>
							<i
								onClick={() => {
									this.updateListHandler(list.id);
								}}
								className="fa fa-check editfloat"
							/>
						</div>
						<div className="cards-container">
							{this.rendercardlist(list.id)}
							<div className="addnew-card-container">
								<div className="inputclass">
									<input
										className="input"
										ref={`cardtitle_${list.id}`}
										placeholder="title"
										type="text"
									/>
								</div>
								<div className="inputclass">
									<input
										className="input"
										ref={`carddetail_${list.id}`}
										placeholder="Detail"
										type="text"
									/>
								</div>
								<a href="#" className="addbutton" onClick={(e) => this.addnewCardhandler(e, list.id)}>
									Add Card
								</a>
							</div>
						</div>
					</div>
				</span>
			);
		});
		return listRenderTemplate;
	}

	addnewCardhandler(event, id) {
		event.preventDefault();

		let cardtitle = this.refs[`cardtitle_${id}`]['value'];
		let carddetail = this.refs[`carddetail_${id}`]['value'];

		if (cardtitle !== '' && carddetail !== '') {
			this.setState(
				{
					...this.state,
					cards: [
						...this.state.cards,
						{
							id: (Math.random() * 121212232197).toFixed(),
							title: cardtitle,
							detail: carddetail,
							listid: id
						}
					]
				},
				() => {
					this.refs[`cardtitle_${id}`]['value'] = '';
					this.refs[`carddetail_${id}`]['value'] = '';
				}
			);
		}
	}

	addNewlistHandler() {
		let listname = this.refs.newlisttitle.value;
		if (listname !== '') {
			this.setState(
				{
					...this.state,
					lists: [ ...this.state.lists, { id: (Math.random() * 121212232197).toFixed(), title: listname } ]
				},
				() => {
					this.refs.newlisttitle.value = '';
				}
			);
		}
	}

	render() {
		return (
			<Fragment>
				<div className="listandcard">
					<div className="horizontal-scroll-container">{this.listRender()}</div>
					<div className="horizontal-scroll-container">
						<div className="addNew-list">
							<input type="text" ref="newlisttitle" />
							<button className="btn-newlist" onClick={this.addNewlistHandler}>
								+Add new list
							</button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default ListComponent;
