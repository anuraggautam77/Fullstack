const Channel = require('../models/channel');
const Messgae = require('../models/message');
const User = require('../models/user');
const axios = require('axios');
const { gitApiUrl } = require('../config/config');

const gitbotController = {
	getGitUsers: async (req, res) => {
		try {
			let response;
			await User.find({})
				.then(
					(users) => {
						if (users) {
							let temparry = [];
							users.map((user) => {
								const { username, _id, lastname, gituser } = user;
								if (user._id.toString() != req.user._id.toString()) {
									temparry.push({ username, _id, lastname, gituser });
								}
							});
							response = temparry;
						} else {
							response = [];
						}
					},
					(err) => {
						response = err;
					}
				)
				.catch((err) => {
					response = err;
				});
			res.status(200).send(response);
		} catch (e) {
			next(e);
		}
	},

	addUserInRepo: async (req, res) => {
		const repourl = req.body.repo;

		console.log(repourl);

		const repo = repourl.split('/')[repourl.split('/').length - 1];
		const owner = repourl.split('/')[repourl.split('/').length - 2];
		if (repo && owner) {
			const collaboratorsURL = `https://api.github.com/repos/${owner}/${repo}/collaborators/${req.body.username}`;
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `token ${req.user.gittoken}`
			};

			axios
				.put(collaboratorsURL, {}, { headers: headers })
				.then((response) => {
					if (response.data) {
						const obj = {
							invitee: response.data.invitee,
							inviter: response.data.inviter,
							invitation: response.data.html_url,
							repodetail: response.data.repository
						};
						res.status(200).send({ invitation: obj });
					}
				})
				.catch((error) => {
					res.status(200).send(error);
				});
		} else {
			res.status(200).send({ messgae: 'Invalid repo Url' });
		}
	},

	listRepo: async (req, res) => {
		let url = `${gitApiUrl.listLoggedInUserRepo}?access_token=${req.user.gittoken}`;
		axios
			.get(url)
			.then(function(response) {
				return Promise.resolve(response.data);
			})
			.then((body) => {
				res.status(200).send(body);
			})
			.catch(function(error) {
				res.status(200).send(error);
			});
	},
	createRepo: async (req, res, done) => {
		var headers = {
			'Content-Type': 'application/json',
			Authorization: `token ${req.user.gittoken}`
		};
		axios
			.post(gitApiUrl.listLoggedInUserRepo, req.body, { headers: headers })
			.then((response) => {
				if (response.data) {
					const repodetail = {
						reponame: response.data.name,
						description: response.data.description,
						fullname: response.data.full_name,
						repo_url: response.data.html_url,
						owner: response.data.owner
					};
					res.status(200).send(repodetail);
				}
			})
			.catch((error) => {
				res.status(200).send(error);
			});
	},
	createNewIssue: async (req, res, done) => {
		const repourl = req.body.url;
		const repo = repourl.split('/')[repourl.split('/').length - 1];
		const owner = repourl.split('/')[repourl.split('/').length - 2];
		if (repo && owner) {
			const issueURL = `https://api.github.com/repos/${owner}/${repo}/issues`;

			const headers = {
				'Content-Type': 'application/json',
				Authorization: `token ${req.user.gittoken}`
			};

			const bodyData = {
				title: req.body.name,
				body: req.body.description
			};
			axios
				.post(issueURL, bodyData, { headers: headers })
				.then((response) => {
					if (response.data) {
						const issueDetail = {
							title: response.data.title,
							description: response.data.body,
							issueurl: response.data.html_url,
							repourl: response.data.repository_url,
							owner: response.data.user
						};
						res.status(200).send(issueDetail);
					}
				})
				.catch((error) => {
					res.status(200).send(error);
				});
		} else {
			res.status(200).send({ messgae: 'Invalid repo Url' });
		}
	},

	addCollaborator: async (req, res, done) => {},
	getListOfIssues: async (req, res, done) => {}
};

module.exports = gitbotController;
