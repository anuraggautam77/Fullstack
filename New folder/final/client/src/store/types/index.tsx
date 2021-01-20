export interface Channel {
	channleId: string;
	name: string;
}
export interface User {
	name: string;
	userId: string;
	username: string;
}

export interface Message {
	message: string;
	channelId: string;
	userId: string;
}

export interface Repo {
	title: string;
	body: string;
}

export interface Issue {
	title: string;
	body: string;
	url: string;
	label: string;
}

export interface Comment {
	created_at: string;
	body: string;
	user: CommentUsers;
}

export interface CommentUsers {
	avatar_url: string;
	login: string;
}

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.

export enum SlackApplicationTypes {
	ADD_NEW_CHANNEL = '@@types/ADD_NEW_CHANNEL',
	GET_CHANNEL_MESSAGE = '@@types/GET_CHANNEL_MESSAGE',
	ADD_NEW_MESSAGE = '@@types/ADD_NEW_MESSAGE',
	DELETE_MESSAGE = '@@types/DELETE_MESSAGE',
	CREATE_REPO = '@@type/CREATE_GITHUB_REPO',
	REPO_DETAIL = '@@type/GITHUB_REPO_DETAIL',
	ISSUE_DETAIL = '@@type/GITHUB_ISSUE_DETAIL',
	
	CREATE_ISSUE = '@@type/CREATE_GITHUB_ISSUE',
	GET_ISSUE_LIST = '@@type/GET_ISSUE_LIST',
	GITHUB_AUTH = '@@type/GITHUB_AUTH',
	GET_CURRENT_CHANNEL = '@@type/GET_CURRENT_CHANNEL',
	USER_REGISTER = '@@type/USER_REGISTER',
	USER_LOGIN = '@@TYPE/USER_LOGIN',
	GET_CHANNELS = '@@TYPE/GET_CHANNELS',
	UPDATE_CHANNELS = '@@TYPE/UPDATE_CHANNELS',
	PUSH_CHANNEL = '@@TYPE/PUSH_CHANNEL'
}

export enum loginTypes {
	LOGIN_REQUEST = '@@types/LOGIN_REQUEST',
	LOGOUT = '@@types/LOGOUT',
	LOGIN_SUCCESS = '@@types/LOGIN_SUCCESS',
	LOGIN_ERROR = '@@types/LOGIN_ERROR',
	LOGIN_CANCELLED = '@@types/LOGIN_CANCELLED',
	SAVE_TOKEN = '@@types/SAVE_TOKEN',
	DELETE_TOKEN = '@@types/DELETE_TOKEN'
}
