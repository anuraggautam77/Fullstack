import { loginTypes } from '../types';
import { LOGGED_IN, LOGGED_OUT, LOGIN_CANCELLED, LOGIN_ERROR } from './../../static';
import _ from 'lodash';
import { AnyAction } from 'redux';

const initialState = {
	token: null,
	status: 'loggedout',
	userId: null
};

const loginReducer = (state = initialState, action: AnyAction) => {
	let newState;
	switch (action.type) {
		case loginTypes.LOGIN_SUCCESS:
			newState = { ...state, status: LOGGED_IN };
			return newState;
		case loginTypes.SAVE_TOKEN:
			newState = { ...state, token: action.payload.token, userId: action.payload.username };
			return newState;
		case loginTypes.DELETE_TOKEN:
			newState = { ...state, token: null };
			newState.token = null;
			return newState;
		case loginTypes.LOGOUT:
			newState = { ...state, status: LOGGED_OUT };
			return newState;
		case loginTypes.LOGIN_ERROR:
			newState = { ...state, status: LOGIN_ERROR };
			return newState;
		case loginTypes.LOGIN_CANCELLED:
			newState = { ...state, status: LOGIN_CANCELLED };
			return newState;
		default:
			return state;
	}
};

export default loginReducer;
