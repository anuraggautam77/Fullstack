/* eslint-env browser */
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const BOARD_SERVICES = {
  getAllBoards() {
    return fetch('/api/board').then(response => response.json());
  },

  addNewBoard(data) {
    return fetch('/api/board', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  },

  updateBoard(data) {
    const param = { Title: data.Title, Description: data.Description };
    return fetch(`/api/board/${data.noteid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },


  deleteBoard(data) {
    return fetch(`/api/board/${data.noteid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

  /**
 *
 *  List Page
 *
 */
  getBoardDetails(id) {
    return fetch(`/api/boardlist/${id}`).then(response => response.json());
  },

  addNewList(data) {
    return fetch('/api/boardlist', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  },

  updateCard(data) {
    const param = { Title: data.Title, Description: data.Description };
    return fetch(`/api/boardlist/${data.localid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

  deleteCard(data) {
    return fetch(`/api/boardlist/${data.cardid}/${data.boardid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

  statusChange(data) {
    const param = { status: data.status, boardid: data.boardid };
    return fetch(`/api/boardlist/changestatus/${data.localid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

};
