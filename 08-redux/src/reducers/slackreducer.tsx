import { SlackApplicationTypes } from '../actiontypes';
import _ from 'lodash';

const initialState = {
	channels: [
		{ id: 1, name: 'Public', members: [ 1, 2, 3 ] },
		{ id: 2, name: 'Star', members: [ 1, 2, 3 ] },
		{ id: 3, name: 'national', members: [ 1, 2 ] }
	],
	users: [ { id: 1, name: 'Anurag' }, { id: 2, name: 'Amit' }, { id: 3, name: 'Ankit' } ],

	messages: [
		{ id: 1, message: 'Hi , Anurag', channelid: 1, userid: 1 },
		{ id: 2, message: 'How are you .....', channelid: 1, userid: 2 },
		{ id: 3, message: 'I am fine, what about you ?', channelid: 1, userid: 1 },
		{ id: 4, message: 'I am fine, what about you ?', channelid: 2, userid: 2 }
	]
};

function slackReducer(state = initialState, action: { type: String; payload: any }) {
	switch (action.type) {
		case SlackApplicationTypes.GET_CURRENT_CHANNEL:
			const currentChannelObject = _.filter(state.channels, {
				id: action.payload.channelid
			});
			return {
				...state,
				currentChannel: currentChannelObject
			};

		case SlackApplicationTypes.GET_CHANNEL_MESSAGE:
			const currentChannelMessage = _.filter(state.messages, {
				channelid: action.payload.channelid
			});
			return {
				...state,
				newMessages: _.forEach(currentChannelMessage, (obj: any) => {
					let arruser: any = _.filter(state.users, { id: obj.userid });
					if (arruser.length > 0) {
						obj.name = arruser[0].name;
					}
				})
			};

		case SlackApplicationTypes.DELETE_MESSAGE:
			state.messages = state.messages.filter((message: any) => message.id != action.payload.id);
			const currentChannelmsg = _.filter(state.messages, {
				channelid: action.payload.channelid
			});

			return {
				...state,

				newMessages: _.forEach(currentChannelmsg, (obj: any) => {
					let arruser: any = _.filter(state.users, { id: obj.userid });
					if (arruser.length > 0) {
						obj.name = arruser[0].name;
					}
				})
			};

		case SlackApplicationTypes.ADD_NEW_CHANNEL:
			return {
				...state,
				channels: [ ...state.channels, action.payload ]
			};

		case SlackApplicationTypes.ADD_NEW_MESSAGE:
			state.messages.push(action.payload);
			let messagedata = _.filter(state.messages, {
				channelid: action.payload.channelid
			});
			return {
				...state,
				newMessages: _.forEach(messagedata, (obj: any) => {
					let arruser: any = _.filter(state.users, { id: obj.userid });
					if (arruser.length > 0) {
						obj.name = arruser[0].name;
					}
				})
			};

		default:
			return state;
	}
}

export default slackReducer;
