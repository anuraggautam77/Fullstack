import { SlackApplicationTypes } from '../types';
import _ from 'lodash';
import { AnyAction } from 'redux';

const initialState = {
	channels: [],
	users: [ { id: 1, name: 'Anurag' }, { id: 2, name: 'Amit' }, { id: 3, name: 'Ankit' } ],
	messages: [
		{ id: 1, message: 'Hi , Anurag', channelid: 1, userid: 1 },
		{ id: 2, message: 'How are you .....', channelid: 1, userid: 2 },
		{ id: 3, message: 'I am fine, what about you ?', channelid: 1, userid: 1 },
		{ id: 4, message: 'I am fine, what about you ?', channelid: 2, userid: 2 }
	]
};

const slackReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SlackApplicationTypes.UPDATE_CHANNELS:
			return { ...state, channels: action.payload.channels };
		case SlackApplicationTypes.GET_CURRENT_CHANNEL:
		case SlackApplicationTypes.GET_CHANNEL_MESSAGE:
		case SlackApplicationTypes.PUSH_CHANNEL:
			return { ...state, channels: [ ...state.channels, action.payload.channels ] };
		case SlackApplicationTypes.ADD_NEW_MESSAGE:

		default:
			return state;
	}
};

export default slackReducer;
