import { all, call, fork, put, takeEvery, takeLatest, cancelled, take, cancel } from 'redux-saga/effects';
import { SlackApplicationTypes, loginTypes } from '../types';

const CREATE_REPO_ENDPOINT = '';

export function* createRepoAPI(data: any) {
	const repoDetail = yield fetch('/api/ga/repo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: data.newRepo.title,
			description: data.newRepo.body,
			private: false,
			has_issues: true,
			has_projects: true,
			has_wiki: true
		})
	}).then((response) => response.json());

	yield put({ type: SlackApplicationTypes.REPO_DETAIL, payload: repoDetail });
}

export function* createRepoIssue(data: any) {
	const issueDetail = yield fetch('/api/ga/repo/issue', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: data.newIssue.title,
			description: data.newIssue.body,
			label: data.newIssue.label,
			url: data.newIssue.url
		})
	}).then((response) => response.json());

	yield put({ type: SlackApplicationTypes.ISSUE_DETAIL, payload: issueDetail });
}

export function* getGitRegisterUser() {
	const users = yield fetch('/api/ga/users', { method: 'GET' }).then((response) => response.json());
	yield put({ type: SlackApplicationTypes.PUSH_USER, payload: users });
}

export function* addUserInRepository(data: any) {
	console.log(data);

	const addInvitation = yield fetch('/api/ga/adduserinrepo', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data.payload)
	}).then((response) => response.json());

	 yield put({ type: SlackApplicationTypes.ADD_INVITATION_DETAIL, payload: addInvitation });
}
