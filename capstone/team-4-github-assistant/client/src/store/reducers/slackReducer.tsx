import { SlackApplicationTypes } from '../types';
import _ from 'lodash';
import { AnyAction } from 'redux';

const initialState = {
	channels: [],
	users: [],
	messages: [],
	status: ''
};

const slackReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case SlackApplicationTypes.UPDATE_CHANNELS:
			return { ...state, channels: action.payload.channels };
		case SlackApplicationTypes.UPDATE_CHANNEL:
			return {
				...state,
				channels: state.channels.map((item) => {
					if (item.channelId === action.payload.channels.channelId) {
						return { ...item, title: action.payload.channels.title };
					} else {
						return item;
					}
				})
			};
		case SlackApplicationTypes.UPDATE_CHANNEL_USER:
			return {
				...state,
				channels: state.channels.map((item) => {
					if (item.channelId === action.payload.channelId) {
						return { ...item, members: action.payload.users };
					} else {
						return item;
					}
				})
			};
		case SlackApplicationTypes.GET_CURRENT_CHANNEL:
		case SlackApplicationTypes.PUSH_CHANNEL:
			return { ...state, channels: [ ...state.channels, action.payload.channels ] };
		case SlackApplicationTypes.ADD_NEW_MESSAGE:
			return { ...state };
		case SlackApplicationTypes.UPDATE_MESSAGES:
			return { ...state, messages: [ ...state.messages, action.payload.newMessage ], };
		case SlackApplicationTypes.UPDATE_ALL_MESSAGES:
			return { ...state, messages: [ ...action.payload.newMessages ] };
		default:
			return state;
	}
};

export default slackReducer;
