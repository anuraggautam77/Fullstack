/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names  */
/* eslint-env browser */

const app = new function () {
  this.el = document.getElementById('allnotes');
  this.addBtnEle = document.getElementById('addnote');
  this.title_ele = document.getElementById('notetitle');
  this.discription_ele = document.getElementById('notedescription');
  this.notes = [];


  this.Count = function (data) {
    const el = document.getElementById('counter');
    let name = 'Note';
    if (data) {
      if (data > 1) {
        name = 'Notes';
      }
      el.innerHTML = `${data} ${name}`;
    } else {
      el.innerHTML = `No ${name}`;
    }
  };

  this.renderall = function (notes) {
    if (notes.length > 0) {
      const noteslist = notes.map((note, i) => `<div class="note" noteid=${note._id}>\
                         <span class="cross_btn">\
                          <b><a class="dangercross delete" href="javascript:void(0)" id="delete_${i}">x</a></b>\
                         </span>\
                         <div class="note-info">\
                            <p contenteditable="false"   class="note_title ${note.completestatus ? 'strikethrough' : ''} title_${i}">${note.Title}</p>\
                            <p contenteditable="false"  class="note_description ${note.completestatus ? 'strikethrough' : ''} description_${i}">${note.Description}</p>\
                            <input class="dn" type="text" value=${note._id} id="localid_${i}" />\
                    </div>\
                     <div class="note_action ${note.completestatus ? 'greenbg' : ''}">${note.completestatus ? '' : ` <a class="link-style edit primary" href="javascript:void(0)" id="edit_${i}">Edit</a><a class="link-style update secondary dn" href="javascript:void(0)" id="update_${i}">Update</a><a class="link-style complete danger" href="javascript:void(0)" id="status_${i}">Complete</a>`}</div>\
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
      NOTE_SERVICES.addNewNote(payload).then(() => {
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
      NOTE_SERVICES.updateNote(payload).then(() => {
        this.toggleEditState('DEACTIVE', event);
      });
    }
  };


  this.changeStatus = function (event) {
    const index = event.target.id.split('_')[1];
    const noteid = document.getElementById(`localid_${index}`).value;

    const payload = { noteid };
    // eslint-disable-next-line no-undef
    NOTE_SERVICES.changeStatus(payload).then(() => {
      this.getAllnotes();
    });
  };


  this.Delete = function (event) {
    const index = event.target.id.split('_')[1];
    const noteid = document.getElementById(`localid_${index}`).value;
    const payload = { noteid };
    // eslint-disable-next-line no-undef
    NOTE_SERVICES.deleteNote(payload).then(() => {
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

      if (event.target.classList.contains('complete')) {
        this.changeStatus(event);
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
    NOTE_SERVICES.getAllNotes().then((data) => {
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
