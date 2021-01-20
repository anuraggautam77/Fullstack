import chai from 'chai';

import store from './store/index';
import { addNewBoard, editBoard, addListInBoard, addCardInList } from './actions/trelloActions';

describe('TRELLO APP', function() {
	it('It should Add Board through dispatach(addNewborard)', () => {
		store.dispatch(addNewBoard({ id: '23874324', title: 'anuraggaut' }));
		chai.expect(store.getState().trelloReducer.boards).to.have.lengthOf(3);
	});

	it('It should Delete a board through dispatach editBoard(board)', () => {
		store.dispatch(editBoard({ id: '23874324', title: 'editdata' }));
		chai.expect(store.getState().trelloReducer.boards).to.have.lengthOf(3);
	});

	it('Add list inside the board through dispatach addListInBoard(list)', () => {
		const payload = {
			boardid: 11,
			list: {
				id: '11221',
				title: 'TO DO'
			}
		};
		store.dispatch(addListInBoard(payload));
		const boardDetail = store.getState().trelloReducer.boards.filter((board) => {
			return board.id == payload.boardid;
		});
      
		chai.expect(boardDetail[0].lists).to.have.lengthOf(4);
	});
 

	it('Add Card in a List using dispatch(addCardInList) ', () => {
		const payload = {
			boardid: 11,
			card: {
				id: '768123213169',
				title: 'task1',
				detail: 'Details of task1',
				listid: '11221'
			}
		};
		store.dispatch(addCardInList(payload));
		const boardDetail = store.getState().trelloReducer.boards.filter((board) => {
			return board.id == payload.boardid;
		});

		chai.expect(boardDetail[0].cards).to.have.lengthOf(5);
	});  
});
