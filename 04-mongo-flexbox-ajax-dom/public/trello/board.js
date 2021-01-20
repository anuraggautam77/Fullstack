/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names  */
/* eslint-env browser */

const app = new function () {
  this.el = document.getElementById('allBoards');
  this.addBtnEle = document.getElementById('addBoard');
  this.title_ele = document.getElementById('boardtitle');
  this.discription_ele = document.getElementById('boarddescription');
  this.notes = [];


  this.Count = function (data) {
    const el = document.getElementById('counter');
    let name = 'Board';
    if (data) {
      if (data > 1) {
        name = 'Boards';
      }
      el.innerHTML = `${data} ${name}`;
    } else {
      el.innerHTML = `No ${name}`;
    }
  };

  this.renderall = function (boards) {
    if (boards.length > 0) {
      const noteslist = boards.map((board, i) => `<div class="note" noteid=${board._id}>\
                         <div class="note-info">\
                            <p contenteditable="false" class="note_title  title_${i}">${board.Title}</p>\
                            <p contenteditable="false" class="note_description  description_${i}">${board.Description}</p>\
                            <input class="dn" type="text" value=${board._id} id="localid_${i}" />\
                    </div>\
                     <div class="note_action">\
                     <a class="link-style edit primary" href="javascript:void(0)" id="edit_${i}">Edit</a>\
                     <a class="link-style update secondary dn" href="javascript:void(0)" id="update_${i}">Update</a>\
                     <a class="link-style delete danger" href="javascript:void(0)" id="delete_${i}">Delete</a>\
                     </div>\
                     <div class="read_action"><a href="/trello/lists.html?id=${board._id}">View Board</a> </div>\
</div>`);
      this.el.innerHTML = noteslist.join('');
    } else {
      this.el.innerHTML = '';
    }
  };

  this.AddNote = function () {
    if (this.title_ele.value && this.discription_ele.value) {
      const payload = { Title: this.title_ele.value, Description: this.discription_ele.value };
      // eslint-disable-next-line no-undef
      BOARD_SERVICES.addNewBoard(payload).then(() => {
        this.getAllnotes();
      });
    }
  };

  this.updateNote = function (event) {
    const index = event.target.id.split('_')[1];
    const noteid = document.getElementById(`localid_${index}`).value;
    const Title = document.getElementsByClassName(`title_${index}`)[0].textContent;
    const Description = document.getElementsByClassName(`description_${index}`)[0].textContent;
    const payload = { noteid, Title, Description };
    if (Title !== '' && Description !== '') {
      // eslint-disable-next-line no-undef
      BOARD_SERVICES.updateBoard(payload).then(() => {
        this.toggleEditState('DEACTIVE', event);
      });
    }
  };


  this.Delete = function (event) {
    const index = event.target.id.split('_')[1];
    const noteid = document.getElementById(`localid_${index}`).value;
    const payload = { noteid };
    // eslint-disable-next-line no-undef
    BOARD_SERVICES.deleteBoard(payload).then(() => {
      this.getAllnotes();
    });
  };

  this.bindEvents = function () {
    this.addBtnEle.addEventListener('click', this.AddNote.bind(this));
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit')) {
        this.toggleEditState('ACTIVE', event);
      }
      if (event.target.classList.contains('update')) {
        // this.toggleEditState('DEACTIVE',event);
        this.updateNote(event);
      }

      if (event.target.classList.contains('delete')) {
        this.Delete(event);
      }

    });
  };

  this.toggleEditState = function (state, event) {
    const index = event.target.id.split('_')[1];

    if (state === 'ACTIVE') {
      document.getElementsByClassName(`title_${index}`)[0].setAttribute('contenteditable', true);
      document.getElementsByClassName(`description_${index}`)[0].setAttribute('contenteditable', true);
      document.getElementById(`update_${index}`).classList.remove('dn');
    } else {
      document.getElementsByClassName(`title_${index}`)[0].setAttribute('contenteditable', false);
      document.getElementsByClassName(`description_${index}`)[0].setAttribute('contenteditable', false);
      document.getElementById(`edit_${index}`).classList.remove('dn');
    }
    event.target.classList.add('dn');
  };


  this.getAllnotes = function () {
    // eslint-disable-next-line no-undef
    BOARD_SERVICES.getAllBoards().then((data) => {
      this.renderall(data.list);
      this.Count(data.list.length);
    });
  };


  this.init = function () {
    this.getAllnotes();
    this.bindEvents();
  };
}();

app.init();
