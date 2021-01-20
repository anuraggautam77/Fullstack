import { SlackApplicationTypes } from '../types';
import _ from 'lodash';

const initialState = {
	repoDetail: {},
	issueDetail: {},
	issueList: [],
	repoStatus: ''
};

const githubReducer = (state = initialState, action: { type: String; payload: any }) => {
	switch (action.type) {
		case SlackApplicationTypes.CREATE_REPO:
			return { ...state, repoDetail: state.repoDetail, repoStatus: '' };
		case SlackApplicationTypes.CREATE_ISSUE:
			return { ...state, issueDetail: action.payload, repoStatus: '' };
		case SlackApplicationTypes.GET_ISSUE_LIST:
			break;
		case SlackApplicationTypes.GITHUB_AUTH:
			break;
		case SlackApplicationTypes.REPO_DETAIL:
			return { ...state, repoDetail: action.payload, repoStatus: 'GET_REPO' };
		case SlackApplicationTypes.ISSUE_DETAIL:
			return { ...state, issueDetail: action.payload, repoStatus: 'GET_ISSUE' };

		default:
			return state;
	}
};

export default githubReducer;
