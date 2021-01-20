/* eslint-env browser */
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
const NOTE_SERVICES = {
  getAllNotes() {
    return fetch('/api/notes').then(response => response.json());
  },

  addNewNote(data) {
    return fetch('/api/notes', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json());
  },

  updateNote(data) {
    const param = { Title: data.Title, Description: data.Description };
    return fetch(`/api/notes/${data.noteid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },


  deleteNote(data) {
    return fetch(`/api/notes/${data.noteid}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

  changeStatus(data) {
    const param = { completestatus: true };
    return fetch(`/api/notes/complete/${data.noteid}`, {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(param), // data can be `string` or {object}!
      headers: { 'Content-Type': 'application/json' },
    }).then(response => response.json());
  },

};
