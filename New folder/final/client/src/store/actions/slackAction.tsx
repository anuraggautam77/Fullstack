import { SlackApplicationTypes, Channel, Message, Issue, Repo } from '../types';

export const addNewChannel = (newChannel: Channel) => {
	return { type: SlackApplicationTypes.ADD_NEW_CHANNEL, newChannel };
};

export const getChannelMessgae = (channelId: string) => {
	return { type: SlackApplicationTypes.GET_CHANNEL_MESSAGE, channelId };
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
