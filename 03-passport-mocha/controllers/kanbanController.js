const kanbanData = require('../stub/boards');

const kanbanController = {

  getAllBoards(req, res) {
    if (kanbanData.boards.length > 0) {
      res.status(200).send({
        boardlist: kanbanData.boards,
        messgae: 'ok',
      });
    } else {
      res.status(404).send({
        messgae: 'No record Found!',
      });
    }
  },

  getOneBoard(req, res) {
    if (req.params.id) {
      if (kanbanData.boards.length > 0) {
        const boardlist = kanbanData.boards.find((obj) => {
          if (obj.boardId === parseInt(req.params.id, 10)) {
            return obj;
          }
        });
        if (boardlist) {
          res.status(200).send({
            board: boardlist,
            messgae: 'ok',
          });
        }
        res.status(404).send({
          messgae: 'Invalid Node Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }
  },


  addBoard(req, res) {
    if (req.body) {
      req.body.boardId = kanbanData.boards.length + 1;
      req.body.list = [];
      kanbanData.boards.push(req.body);
      res.status(201).send({
        note: kanbanData.boards,
        messgae: 'Note added Scucessfully  !!!',
      });
    }
  },
  updateBoard(req, res) {
    const boardData = req.body;
    if (req.params.id) {
      if (kanbanData.boards.length > 0) {
        const index = kanbanData.boards.findIndex(
          obj => (obj.boardId === parseInt(req.params.id, 10)),
        );
        if (index !== -1) {
          kanbanData.boards[index].name = boardData.name;
          kanbanData.boards[index].bescription = boardData.bescription;
          res.status(202).send({
            notes: kanbanData.boards,
            messgae: 'ok',
          });
        } else {
          res.status(404).send({
            messgae: 'invalid Id',
          });
        }
      }
    }
    res.status(404).send({
      messgae: 'No record Found!',
    });
  },
  deleteBoard(req, res) {
    if (req.params.id) {
      if (kanbanData.boards.length > 0) {
        const index = kanbanData.boards.findIndex(
          obj => (obj.boardId === parseInt(req.params.id, 10)),
        );
        if (index !== -1) {
          kanbanData.boards.splice(index, 1);
          res.status(200).send({
            board: kanbanData.boards,
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

  getBoardSubList(req, res) {
    const boardid = [...req.params];

    if (boardid) {
      if (kanbanData.boards.length > 0) {
        const boardlist = kanbanData.boards.find((obj) => {
          if (obj.boardId === parseInt(boardid, 10)) {
            return obj;
          }
        });
        if (boardlist) {
          res.status(200).send({
            list: boardlist.list,
            messgae: 'ok',
          });
        }
        res.status(404).send({
          messgae: 'Invalid Node Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }

    res.status(200).send({
      messgae: 'No record Found!',
    });
  },

  createBoardSubList(req, res) {
    const boardid = [...req.params];

    if (req.body) {
      if (kanbanData.boards.length > 0) {
        const boardlist = kanbanData.boards.find((obj) => {
          if (obj.boardId === parseInt(boardid, 10)) {
            return obj;
          }
        });
        if (boardlist) {
          req.body.listid = boardlist.list.length + 1;
          req.body.card = [];
          boardlist.list.push(req.body);
          res.status(200).send({
            list: boardlist.list,
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

  createTaskOfList(req, res) {
    const boardId = req.params.boardid;
    const listId = req.params.listid;

    if (req.body) {
      if (kanbanData.boards.length > 0) {
        const boardlist = kanbanData.boards.find((obj) => {
          if (obj.boardId === parseInt(boardId, 10)) {
            return obj;
          }
        });

        if (boardlist && boardlist.list.length > 0) {
          const list = boardlist.list.find((obj) => {
            if (obj.listid === parseInt(listId, 10)) {
              return obj;
            }
          });

          if (list) {
            req.body.id = list.card.length + 1;
            list.card.push(req.body);
            res.status(201).send({
              card: list.card,
              messgae: 'ok',
            });
          }
          res.status(404).send({
            messgae: 'Invalid  Id!',
          });
        } else {
          res.status(404).send({
            messgae: 'No List found !!',
          });
        }
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }
  },

};

module.exports = kanbanController;
