import chai from 'chai';

import store from './store/index';
import { addNewItem, deleteItem } from './actions/TodoActions';

describe('Todo APP', function() {
	it('It should Add Item through dispatach(addNewItem)', () => {

    const payload = { id: 89, name: 'basic', status: 'P' };

    store.dispatch(addNewItem(payload));
		chai.expect(store.getState().todoReducer.items).to.have.lengthOf(4);
	});

	it('It should Delete Item from list through dispatach(deleteItem)', () => {
		const payload = { id: 2121 };
    store.dispatch(deleteItem(payload));
		chai.expect(store.getState().todoReducer.items).to.have.lengthOf(3);
	});
});
