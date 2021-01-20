import { SlackApplicationTypes } from '../types';
import _ from 'lodash';

const initialState = {
	repoDetail: {},
	issueDetail: {},
	issueList: [],
	repoStatus: '',
	gitHubUser: [],
	invitationDetail: {}
};

const githubReducer = (state = initialState, action: { type: String; payload: any }) => {
	switch (action.type) {
		case SlackApplicationTypes.CREATE_REPO:
			return { ...state, repoDetail: state.repoDetail, repoStatus: '' };
		case SlackApplicationTypes.ADD_USER_REPO:
			return { ...state, invitationDetail: state.invitationDetail, repoStatus: '' };
		case SlackApplicationTypes.ADD_INVITATION_DETAIL:
			return { ...state, invitationDetail: action.payload, repoStatus: 'INVITATION', inProgress: true };
		case SlackApplicationTypes.CREATE_ISSUE:
			return { ...state, issueDetail: action.payload, repoStatus: '' };
		case SlackApplicationTypes.GET_ISSUE_LIST:
			break;
		case SlackApplicationTypes.GITHUB_AUTH:
			break;
		case SlackApplicationTypes.REPO_DETAIL:
			return { ...state, repoDetail: action.payload, repoStatus: 'GET_REPO', inProgress: true };

		case SlackApplicationTypes.ISSUE_DETAIL:
			return { ...state, issueDetail: action.payload, repoStatus: 'GET_ISSUE', inProgress: true };

		case SlackApplicationTypes.GET_GITHUB_USER:
			return { ...state, gitHubUser: [] };

		case SlackApplicationTypes.PUSH_USER:
			return { ...state, gitHubUser: [ ...state.gitHubUser, ...action.payload ] };

		case SlackApplicationTypes.CHANGE_PROGRESS_STATUS:
			return { ...state, inProgress: false };
		default:
			return state;
	}
};

export default githubReducer;
