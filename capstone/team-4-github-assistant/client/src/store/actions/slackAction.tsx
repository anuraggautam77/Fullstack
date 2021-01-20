import { SlackApplicationTypes, Channel, Message, Issue, Repo } from '../types';

export const addNewChannel = (newChannel: Channel) => {
	return { type: SlackApplicationTypes.ADD_NEW_CHANNEL, newChannel };
};

export const editChannel = (editChannel: Channel) => {
	return { type: SlackApplicationTypes.EDIT_CHANNEL, editChannel };
};

export const getChannelMessgae = (channelId: string) => {
	return { type: SlackApplicationTypes.GET_CHANNEL_MESSAGE, channelId };
};

export const getUserMessgae = (payload) => {
	console.log(payload);
	return { type: SlackApplicationTypes.GET_USER_MESSAGE, payload };
};

export const addNewMessage = (newMessgae: Message) => {
	return { type: SlackApplicationTypes.ADD_NEW_MESSAGE, newMessgae };
};

export const deleteMessage = (messageId: number) => {
	return { type: SlackApplicationTypes.DELETE_MESSAGE, messageId };
};

export const githubauth = (payload: any) => {
	return { type: SlackApplicationTypes.GITHUB_AUTH, payload };
};

export const createRepo = (newRepo: Repo) => {
	return { type: SlackApplicationTypes.CREATE_REPO, newRepo };
};
export const changeProgressStatus = () => {
	return { type: SlackApplicationTypes.CHANGE_PROGRESS_STATUS };
};

export const createissue = (newIssue: Issue) => {
	return { type: SlackApplicationTypes.CREATE_ISSUE, newIssue };
};

export const getissueslist = (payload: any) => {
	return { type: SlackApplicationTypes.GET_ISSUE_LIST, payload };
};

export const registerUser = (payload: any) => {
	return { type: SlackApplicationTypes.USER_REGISTER, payload };
};

export const userLogin = (payload: any) => {
	return { type: SlackApplicationTypes.USER_LOGIN, payload };
};

export const getChannels = (payload: any) => {
	return { type: SlackApplicationTypes.GET_CHANNELS, payload };
};

export const getGitHubUser = (payload: any) => {
	return { type: SlackApplicationTypes.GET_GITHUB_USER, payload };
};

export const addUserInRepo = (payload: any) => {
	return { type: SlackApplicationTypes.ADD_USER_REPO, payload };
};

export const addUserToChannel = (payload: any) => {
	return { type: SlackApplicationTypes.ADD_USER_CHANNEL, payload };
};

export const addDirectMessage = (payload: any) => {
	return { type: SlackApplicationTypes.UPDATE_MESSAGES, payload };
};
