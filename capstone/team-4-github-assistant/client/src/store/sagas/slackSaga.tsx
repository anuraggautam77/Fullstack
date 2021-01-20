import { all, call, fork, put, takeEvery, takeLatest, cancelled, take, cancel } from 'redux-saga/effects';
import { SlackApplicationTypes, loginTypes } from '../types';
import { createRepoAPI, createRepoIssue, getGitRegisterUser, addUserInRepository } from './githubApi';

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
				.then(
					(resdata) =>
						!!resdata.success
							? { token: resdata.token, username: resdata.username }
							: { token: null, username: null }
				);
			resolve(result);
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

function* getChannelMessages({ channelId }: any) {
	let Req: any = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const messages = yield fetch(`/api/slack/channel/${channelId}/messages`, Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (resdata.length > 0 ? resdata : []));

	yield put({ type: SlackApplicationTypes.UPDATE_ALL_MESSAGES, payload: { newMessages: messages } });
}

function* getUserMessages(data: any) {
	let Req: any = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	};
	const messages = yield fetch(`/api/slack/messages/${data.payload.senderId}/${data.payload.userId}`, Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (resdata.length > 0 ? resdata : []));

	yield put({ type: SlackApplicationTypes.UPDATE_ALL_MESSAGES, payload: { newMessages: messages } });
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

function* editChannelLists(data: any) {
	console.log(data);
	let Req: any = {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title: data.editChannel.newTitle })
	};
	const channels = yield fetch(`/api/slack/channel/${data.editChannel.channelId}`, Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (!resdata.errors && resdata ? { ...resdata, channelId: data.editChannel.channelId } : null));
	yield put({ type: SlackApplicationTypes.UPDATE_CHANNEL, payload: { channels } });
}

function* addUserToChannelAction(data: any) {
	let Req: any = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ users: data.payload.usersList })
	};
	let users = yield fetch(`/api/slack/channel/${data.payload.channelId}/user`, Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (!resdata.errors && resdata ? resdata : null));
	users = users.lists.map((item) => item._id);
	yield put({
		type: SlackApplicationTypes.UPDATE_CHANNEL_USER,
		payload: { channelId: data.payload.channelId, users }
	});
}

function* addMessgaesToChat(data: any) {
	let Req: any = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data.newMessgae)
	};
	let newMessage = yield fetch(`/api/slack/message`, Req)
		.then(
			(response: Response) => {
				return response.json();
			},
			(error: any) => {
				return error;
			}
		)
		.then((resdata) => (!resdata.errors && resdata ? resdata : null));
	yield put({ type: SlackApplicationTypes.UPDATE_MESSAGES, payload: { newMessage } });
}

export function* authorize(data: any) {
	try {
		const res = yield call(fakeAuthorize, data);
		if (res.username != null) {
			yield put({ type: loginTypes.LOGIN_SUCCESS });
			yield put({ type: loginTypes.SAVE_TOKEN, payload: res });
		} else {
			yield put({ type: loginTypes.LOGIN_ERROR, payload: { status: 'Not a valid User' } });
		}
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
	yield takeEvery(SlackApplicationTypes.ADD_NEW_MESSAGE, addMessgaesToChat);
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

function* editChannel() {
	yield takeEvery(SlackApplicationTypes.EDIT_CHANNEL, editChannelLists);
}

function* addUserToChannel() {
	yield takeEvery(SlackApplicationTypes.ADD_USER_CHANNEL, addUserToChannelAction);
}

function* createRepo() {
	yield takeEvery(SlackApplicationTypes.CREATE_REPO, createRepoAPI);
}

function* createIssue() {
	yield takeEvery(SlackApplicationTypes.CREATE_ISSUE, createRepoIssue);
}

function* getGitUser() {
	yield takeEvery(SlackApplicationTypes.GET_GITHUB_USER, getGitRegisterUser);
}

function* addUserInRepo() {
	yield takeEvery(SlackApplicationTypes.ADD_USER_REPO, addUserInRepository);
}

function* getUserMessagesSaga() {
	yield takeEvery(SlackApplicationTypes.GET_USER_MESSAGE, getUserMessages);
}

function* getChannelMessagesSaga() {
	yield takeEvery(SlackApplicationTypes.GET_CHANNEL_MESSAGE, getChannelMessages);
}

function* slackSaga() {
	yield all([
		fork(watchFetchIssueList),
		fork(createIssue),
		fork(createRepo),
		fork(gitHubLogin),
		fork(deleteMessage),
		fork(fetchChannelMessage),
		fork(registerUser),
		fork(userLogin),
		fork(getChannels),
		fork(addNewChannel),
		fork(editChannel),
		fork(getGitUser),
		fork(addUserInRepo),
		fork(addUserToChannel),
		fork(AddNewMessage),
		fork(getUserMessagesSaga),
		fork(getChannelMessagesSaga)
	]);
}
export default slackSaga;
