/* eslint-env browser */
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const BOARD_SERVICES = {
  getAllBoards() {
    return fetch('/api/board',
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${this.getCookie('jwt-token')}`,
        },
      }).then(response => response.json());
  },

  getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },


  addNewBoard(data) {
    return fetch('/api/board', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  updateBoard(data) {
    const param = { Title: data.Title, Description: data.Description };
    return fetch(`/api/board/${data.noteid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },


  deleteBoard(data) {
    return fetch(`/api/board/${data.noteid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  /**
   *
   *  List Page
   *
   */

  getBoardDetails(id) {
    return fetch(`/api/boardlist/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },


  addNewList(data) {
    return fetch('/api/boardlist/newlist', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },


  addNewCard(data) {
    return fetch('/api/boardlist/newcard', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  updateCard(data) {
    const param = { Title: data.Title, Description: data.Description };
    return fetch(`/api/boardlist/${data.localid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },
  cardPlacement(listid, cardid, prev) {
    return fetch(`/api/boardlist/statusupdate/${cardid}/${prev}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify({ listid }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  deleteCard(data) {
    return fetch(`/api/boardlist/${data.cardid}/${data.boardid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },


  getUserlist() {
    return fetch(`/api/boardlist/${data.cardid}/${data.boardid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  getUserlist() {
    return fetch('/api/boardlist/list/userlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },

  addUserInboard(obj) {
    return fetch('/api/boardlist/list/user', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.getCookie('jwt-token')}`,
      },
    }).then(response => response.json());
  },
};
