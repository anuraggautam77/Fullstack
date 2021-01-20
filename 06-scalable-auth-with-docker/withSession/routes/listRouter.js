// eslint-disable-next-line func-names
module.exports = function(io) {
	const express = require('express');
	const apiRoutes = express.Router();
	// eslint-disable-next-line global-require
	const listController = require('../controllers/listController');

	function authToken(req, res, next) {
		if (req.isAuthenticated()) {
			req.body.userid = req.user._id;
			req.body.username = req.user.username;
			return next();
		  }
		res.sendStatus(401);
	}

	function emitMessageToclient(messageTo, channel, data) {
		io.webusers.forEach((element) => {
			if (messageTo.indexOf(element.loggeduser) !== -1) {
				io.to(element.socketid).emit(channel, data);
			}
		});
	}

	apiRoutes.get('/:id', authToken, listController.getBoardDetails);

	apiRoutes.post('/newlist', authToken, listController.addOneList, (req, res) => {
		// io.emit('BROADCAST_LIST', req.list);
		emitMessageToclient(req.messageTo, 'BROADCAST_LIST', req.list);
		res.status(201).send({ success: true, message: 'Successfully Add List' });
	});

	apiRoutes.post('/newcard', authToken, listController.addOneCard, (req, res) => {
		//  io.emit('BROADCAST_CARD', req.card);
		emitMessageToclient(req.messageTo, 'BROADCAST_CARD', req.card);
		res.status(201).send({ success: true, message: 'Successfully Add Card' });
	});

	apiRoutes.put('/:id', authToken, listController.updateCard, (req, res) => {
		//  io.emit('BROADCAST_UPDATE_CARD', req.card);
		emitMessageToclient(req.messageTo, 'BROADCAST_UPDATE_CARD', req.card);
		res.status(200).send({ success: true, message: 'Successfully Card Updated' });
	});

	apiRoutes.put('/statusupdate/:cardid/:prevlist', authToken, listController.cardStatus, (req, res) => {
		// io.emit('DROP_CARD_TO_LIST');
		emitMessageToclient(req.messageTo, 'DROP_CARD_TO_LIST', {
			list: req.list,
			prev: req.params.prevlist
		});
		res.status(200).send({ success: true, message: 'Successfully Card Updated' });
	});

	apiRoutes.delete('/:id/:boardid', authToken, listController.deleteCard, (req, res) => {
		// io.emit('BROADCAST_DELETE_CARD', req.cardid);
		emitMessageToclient(req.messageTo, 'BROADCAST_DELETE_CARD', req.cardid);
		res.status(200).send({ success: true, message: 'Successfully Card Updated' });
	});

	apiRoutes.get('/list/userlist', authToken, listController.userlist);

	apiRoutes.post('/list/user', authToken, listController.addUserInBoard);
	return apiRoutes;
};
