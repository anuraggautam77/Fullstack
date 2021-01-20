const groupData = require('../data/collaboration');

const workspaces = [...groupData.workspaces];
const users = [...groupData.users];

const collaborationController = {

  getAllWorkspaces: (req, res) => {
    if (workspaces.length > 0) {
      res.status(200).send({ workspace: workspaces, messgae: 'ok' });
    } else {
      res.status(404).send({ messgae: 'No record Found!' });
    }
  },

  getSingleWorkspace: (req, res) => {
    if (req.params.id) {
      if (workspaces.length > 0) {
        const workspace = workspaces.find((obj) => {
          if (obj.id === parseInt(req.params.id, 10)) {
            return obj;
          }
        });
        if (workspace) {
          res.status(200).send({ board: workspace, messgae: 'ok' });
        }
        res.status(404).send({ messgae: 'Invalid workspace Id!' });
      } else {
        res.status(404).send({ messgae: 'No record Found!' });
      }
    }
  },

  addWorkspace: (req, res) => {
    if (req.body) {
      req.body.id = workspaces.length + 1;
      req.body.users = [];
      req.body.channels = [];
      workspaces.push(req.body);
      res.status(201).send({ workspace: workspaces, messgae: 'Workspace added Scucessfully!!!' });
    }
  },

  updateWorkspace: (req, res) => {
    const body = [...req.body];

    if (req.params.id) {
      if (workspaces.length > 0) {
        const index = workspaces.findIndex(obj => (obj.id === parseInt(req.params.id, 10)));

        if (index !== -1) {
          workspaces[index].name = body.name;
          res.status(202).send({ workspace: workspaces, messgae: 'ok' });
        } else {
          res.status(404).send({ messgae: 'invalid Id' });
        }
      }
    }
    res.status(404).send({ messgae: 'No record Found!' });
  },

  deleteWorkspace(req, res) {
    if (req.params.id) {
      if (workspaces.length > 0) {
        const index = workspaces.findIndex((obj) => (obj.id === parseInt(req.params.id)));

        if (index !== -1) {
          workspaces.splice(index, 1);
          res.status(200).send({
            board: workspaces,
            messgae: 'ok',
          });
        } else {
          res.status(404).send({
            messgae: 'invalid Id',
          });
        }
      }
    }
    res.status(204).send({
      messgae: 'No record Found!',
    });
  },


  addChannelInWorkspace(req, res) {
    const workspaceId = req.params.workspaceid;

    if (req.body) {
      if (workspaces.length > 0) {
        const workspace = workspaces.find((obj) => {
          if (obj.id === parseInt(workspaceId)) {
            return obj;
          }
        });
        if (workspace) {
          req.body.id = workspace.channels.length + 1;
          req.body.users = [];
          workspace.channels.push(req.body);
          res.status(201).send({
            list: workspace.channels,
            messgae: 'ok',
          });
        }
        res.status(404).send({
          messgae: 'Invalid  Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }
  },

  addUserInWorkspace(req, res) {


    const workspaceId = req.params.workspaceid;

    if (req.body) {
      /**
     *  Add user To user collection
     */
      const userID = users.length + 1;
      req.body.id = userID;
      users.push(req.body);
      /**
             * Map userID to workspace
             */

      if (workspaces.length > 0) {
        const workspace = workspaces.find((obj) => {
          if (obj.id === parseInt(workspaceId, 10)) {
            return obj;
          }
        });
        if (workspace) {
          workspace.users.push(userID);
          res.status(201).send({
            messgae: 'user added to workspace',
          });
        }
        res.status(404).send({
          messgae: 'Invalid  Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }
  },

  addUserChannelWorkspace(req, res) {


    const workspaceId = req.params.workspaceid;
    const channelId = req.params.channelid;

    const userID = users.length + 1;
    req.body.id = userID;

    if (workspaces.length > 0) {
      const workspace = workspaces.find((obj) => {
        if (obj.id === parseInt(workspaceId, 10)) {
          return obj;
        }
      });

      if (workspace) {
        const channel = workspace.channels.find((obj) => {
          if (obj.id === parseInt(channelId, 10)) {
            return obj;
          }
        });

        if (channel) {
          users.push(req.body);
          channel.users.push(userID);
          res.status(201).send({
            messgae: 'user added to channel',
          });
        }

        res.status(404).send({
          messgae: 'Channel is not found in Workspace Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'Workspace Id invalid!',
        });
      }
    } else {
      res.status(404).send({
        messgae: 'No record Found!',
      });
    }
  },


  getChannelUsers(req, res) {
    const workspaceId = req.params.workspaceid;
    const channelId = req.params.channelid;

    if (workspaces.length > 0) {
      const workspace = workspaces.find((obj) => {
        if (obj.id === parseInt(workspaceId,10)) {
          return obj;
        }
      });

      if (workspace) {
        const channel = workspace.channels.find((obj) => {
          if (obj.id === parseInt(channelId, 10)) {
            return obj;
          }
        });

        if (channel) {
          const channelUsers = getUserList(channel.users);
          if (channelUsers.length > 0) {
            res.status(200).send({ users: channelUsers, messgae: 'ok' });
          } else {
            res.status(200).send({ messgae: 'No users for this channel!' });
          }
        }
      } else {
        res.status(404).send({
          messgae: 'Workspace Id invalid!',
        });
      }
    } else {
      res.status(404).send({
        messgae: 'No record Found!',
      });
    }
  },
};


function getUserList(userids) {
  const userList = [];
  users.map((obj) => {
    if (userids.indexOf(obj.id) !== -1) {
      userList.push(obj);
    }
  });
  return userList;
}


module.exports = collaborationController;
