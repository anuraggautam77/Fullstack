import { all, call, fork, put, takeEvery, takeLatest, cancelled, take, cancel } from 'redux-saga/effects';
import { SlackApplicationTypes, loginTypes } from '../types';

import { createRepoAPI ,createRepoIssue} from './githubApi';

export function fakeAuthorize(data: any) {
	return new Promise(async (resolve, reject) => {
		try {
			let Req: any = {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data.payload)
			};
			const result = await fetch('/api/auth/login', Req)
				.then(
					(response: Response) => {
						return response.json();
					},
					(error: any) => {
						return error;
					}
				)
				.then((resdata) => (!!resdata.success ? { token: resdata.token } : { token: null }));
			resolve(result.token);
		} catch (error) {
			reject(error);
		}
	});
}

function* getChannelLists() {
	let Req: any = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const channels = yield fetch('/api/slack/channel', Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (resdata.length > 0 ? resdata : []));

	yield put({ type: SlackApplicationTypes.UPDATE_CHANNELS, payload: { channels } });
}

function* addChannelLists(data: any) {
	let Req: any = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data.newChannel)
	};
	const channels = yield fetch('/api/slack/channel', Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (!resdata.errors && resdata ? resdata : null));
	yield put({ type: SlackApplicationTypes.PUSH_CHANNEL, payload: { channels } });
}

export function* authorize(data: any) {
	try {
		const token = yield call(fakeAuthorize, data);
		yield put({ type: loginTypes.LOGIN_SUCCESS });
		yield put({ type: loginTypes.SAVE_TOKEN, payload: { token } });
	} catch (error) {
		yield put({ type: loginTypes.LOGIN_ERROR, payload: { status: error } });
	} finally {
		if (yield cancelled()) {
			yield put({ type: loginTypes.LOGIN_CANCELLED });
		}
	}
}

function* watchFetchIssueList() {
	yield takeEvery(SlackApplicationTypes.GET_ISSUE_LIST, () => {});
}


function* gitHubLogin() {
	yield takeEvery(SlackApplicationTypes.GITHUB_AUTH, () => {});
}

function* AddNewMessage() {
	yield takeEvery(SlackApplicationTypes.ADD_NEW_MESSAGE, () => {});
}

function* deleteMessage() {
	yield takeEvery(SlackApplicationTypes.DELETE_MESSAGE, () => {});
}

function* fetchChannelMessage() {
	yield takeEvery(SlackApplicationTypes.GET_CHANNEL_MESSAGE, () => {});
}

function* registerUser() {
	yield takeEvery(SlackApplicationTypes.USER_REGISTER, () => {});
}

function* userLogin() {
	const task = yield takeEvery(SlackApplicationTypes.USER_LOGIN, (data: any) => {
		return authorize(data);
	});
	const action = yield take([ loginTypes.LOGOUT, loginTypes.LOGIN_ERROR ]);
	if (action.type === loginTypes.LOGOUT) {
		yield cancel(task);
		yield put({ type: loginTypes.DELETE_TOKEN });
	}
}

function* getChannels() {
	yield takeLatest(SlackApplicationTypes.GET_CHANNELS, getChannelLists);
}

function* addNewChannel() {
	yield takeEvery(SlackApplicationTypes.ADD_NEW_CHANNEL, addChannelLists);
}



function* createRepo() {
	yield takeEvery(SlackApplicationTypes.CREATE_REPO, createRepoAPI);
}

function* createIssue() {
	yield takeEvery(SlackApplicationTypes.CREATE_ISSUE, createRepoIssue);
}



function* slackSaga() {
	yield all([
		fork(watchFetchIssueList),
		fork(createIssue),
		fork(createRepo),
		fork(gitHubLogin),
		fork(AddNewMessage),
		fork(deleteMessage),
		fork(fetchChannelMessage),
		fork(registerUser),
		fork(userLogin),
		fork(getChannels),
		fork(addNewChannel)
	]);
}
export default slackSaga;
