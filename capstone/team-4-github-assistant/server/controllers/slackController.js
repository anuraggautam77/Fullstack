const mongoose = require('mongoose');
const Channel = require('../models/channel');
const Message = require('../models/message');


const slackController = {
  
  toObjectId : async (ids) => {

    if (ids.constructor === Array) {
      return ids.map(item => mongoose.Types.ObjectId(item));
    }

    return mongoose.Types.ObjectId(ids);
  },

  createChannel : async (req, res, next) => {
    try {
      const newChannel = new Channel(req.body);
      if (newChannel && req.body) {
        let response;
        newChannel.channelId = `C${(Math.random() * 12345).toFixed()}`;
        let channelsList = [];
          await newChannel.save().then((newchannel) => {
            response = newchannel;
            channelsList.push(newChannel._id);
          }, (err) => {
            response = err;
          },
          ).catch((err) => {
            response = err;
          });
        res.status(201).send(response);
      } else {
        res.status(201).send({ message: 'req empty' });
      }
    } catch (e) {
      next(e);
    }
  },

  
  getChannels : async (req, res, next) => {
    try {
      let response;
      await Channel.find({}).then((channels) => {
        if (channels) {
          response = channels;
        } else {
          response = [];
        }
      }, (err) => {
        response = err;
      }).catch((err) => {
        response = err;
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  },

  getChannelById : (req, res, next) => {
    try {
      let response;
      const code = 200;
      Channel.findOne({ channelId: req.params.channelId }, (err, channel) => {
        if (!channel) {
          response = {
            error: 'Unable to get requested channel',
          };
        } else {
          response = channel;
        }
        utils.setResponseHeader(res, 'application/json');
        utils.setStatusCode(res, code).send(response);
      });
    } catch (e) {
      next(e);
    }
  },
  
  updateChannelById : (req, res, next) => {
    try {
      Channel.updateOne({ channelId: req.params.channelId }, { $set: req.body }, (err, status) => {
        let response;
        const code = 200;
        if (!err && status.nModified) {
          response = req.body;
        } else if (!err && !status.nModified) {
          response = { message: 'unable to update your channel' };
        }
        else {
          response = err;
        }
        res.status(200).send(response);
      });
    } catch (e) {
      next(e);
    }
  },

  deleteChannelById : (req, res, next) => {
    try {
      let response;
      const code = 200;
      Channel.deleteOne({ channelId: req.params.channelId }, (err, status) => {
        if (!err && status.n) {
          response = { message: 'success' };
        } else if (!err && !status.n) {
          response = { message: 'unable to delete your channel' };
        }
        else {
          response = err;
        }
        res.status(200).send(response);
      });
    } catch (e) {
      next(e);
    }
  },

  getMessagesBy : async (req, res, next) => {
    try {
      let response;
      const condition = {};
      if (req.params.channelId) {
        condition.channelId = req.params.channelId;
      } else {
        condition.$or = [{
          userId: req.params.to,
          senderId: req.params.from,
        }, {
          userId: req.params.from,
          senderId: req.params.to,
        }];
      }
      Message.find(condition, (err, docs) => {
        if (!err) {
          response = docs;
        } else {
          response = err;
        }
        res.status(200).send(response);
      });
    } catch (e) {
      next(e);
    }
  },

  postUserToChannel : async (req, res, next) => {
    try {
      let response = {};
      const code = 200;
      if (req.params.channelId) {
        const getMembers = await Channel.findOne({ channelId: req.params.channelId });
        let usersList = getMembers.members;
        const newListUser = await slackController.toObjectId(req.body.users);
        usersList = [...usersList, ...newListUser];
        const uStatus = await Channel.updateOne({ channelId: req.params.channelId }, { $set: { members: usersList } });
        if (uStatus.nModified) {
          const lists = await Channel.findOne({ channelId: req.params.channelId }).populate('members', 'username _id').exec();
          response.lists = lists.members;
        } else {
          response = uStatus;
        }
      } else {
        response = { message: 'no channel found' };
      }
      res.status(code).send(response);
    } catch (e) {
      next(e);
    }
  },

  getUsersFromChannel : async (req, res, next) => {
    try {
      let response;
      const code = 200;

      if (req.params.channelId) {
        await Channel.findOne({ channelId: req.params.channelId }, (err, doc) => {
          if (!err && doc) {

            response = doc.members;

          } else {

            response = err;
          }
        });
      } else {
        response = { message: 'no channel found' };
      }
      res.status(code).send(response);
    } catch (e) {
      next(e);
    }
  },
  createMessage : async (req, res, next) => {
    try {
      const newMsg = new Message(req.body);
      if (newMsg) {
        newMsg.messageId = `M${Number((Math.random() * 12345).toFixed())}`;
        newMsg.createdAt = new Date();
        newMsg.save((err, mesg) => {
          let response;
          if (!err) {
            response = mesg;
            /*const io = req.app.get('socketio');
            if (!mesg.channelId && !mesg.userId) {
              io.emit('hi', 'connected');
            } else if (mesg.channelId) {
              io.in(mesg.channelId).emit('hi', mesg);
            }
            else if (mesg.userId) {
              console.log(mesg.userId);
              io.in(mesg.userId).emit('hi', mesg);
            }*/
          } else {
            response = err;
          }
          res.status(201).send(response);
        });
      }
      else {
        res.status(200).send({ message: 'req empty' });
      }
    } catch (e) {
      next(e);
    }
  }
};

module.exports = slackController;
