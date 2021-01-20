import chai from 'chai';

import store from './store/index';
import { addNewChannel, getChannelMessgae } from './store/actions/slackAction';
import { addNewMessage } from "./store/actions/addNewMessage";

describe('SLACK APP', function() {
	it('It should Add New Channel through dispatach(addNEWChannel)', () => {
		store.dispatch(addNewChannel({ id: 4, name: 'basic', members: [] }));
		chai.expect(store.getState().slackReducer.channels).to.have.lengthOf(4);
	});

	it('It should Add new Message  through dispatach(addNewMessage)', () => {
		const payload = { id: 80, message: 'where are you guys ! Iam waiting for you', channelid: 1, userid: 1 };
		store.dispatch(addNewMessage(payload));
		chai.expect(store.getState().slackReducer.messages).to.have.lengthOf(5);
	});

	it('Get all messages of specific channel through dispatach(getChannelMessgae)', () => {
		const payload = { channelid: 1 };
		store.dispatch(getChannelMessgae(payload));
		console.log(store.getState().slackReducer.newMessages);
		chai.expect(store.getState().slackReducer.newMessages).to.have.lengthOf(4);
	});
});
