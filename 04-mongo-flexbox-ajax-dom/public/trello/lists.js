/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names  */
/* eslint-env browser */

const applist = new function () {
  this.el = document.getElementById('todo-container');
  this.wipEle = document.getElementById('wip-container');
  this.doneEle = document.getElementById('done-container');
  this.boardname = document.getElementById('boardname');
  this.addBtnEle = document.getElementById('addCard');
  this.boardIdele = document.getElementById('boardid');
  this.title_ele = document.getElementById('cardTitle');
  this.discription_ele = document.getElementById('cardDesc');

  this.AddList = function () {
    if (this.discription_ele.value && this.title_ele.value && this.boardIdele.value) {
      const payload = {
        bid: this.boardIdele.value,
        Title: this.title_ele.value,
        Description: this.discription_ele.value,
      };
      // eslint-disable-next-line no-undef
      BOARD_SERVICES.addNewList(payload).then((data) => {
        if (data.list) {
          this.renderall(data.list);
        }
      });
    }
  };

  this.toggleEditState = function (state, event) {
    const index = event.target.id.split('_')[1];
    if (state === 'ACTIVE') {
      document.getElementsByClassName(`note_title_${index}`)[0].setAttribute('contenteditable', true);
      document.getElementsByClassName(`note_description_${index}`)[0].setAttribute('contenteditable', true);
      document.getElementById(`update_${index}`).classList.remove('dn');
    } else {
      document.getElementsByClassName(`note_title_${index}`)[0].setAttribute('contenteditable', false);
      document.getElementsByClassName(`note_description_${index}`)[0].setAttribute('contenteditable', false);
      document.getElementById(`edit_${index}`).classList.remove('dn');
    }
    event.target.classList.add('dn');
  };

  this.renderall = function (lists) {
    let todolist = '';
    let wiplist = '';
    let donelist = '';

    if (lists.length > 0) {
      lists.map((list, i) => {
        const temp = `<div class="list"> 
                    <span class="cross_btn" noteid=${list._id}> 
                        <b>
                            <a class="dangercross delete"  href="javascript:void(0)" id="delete_${i}">x</a>
                        </b> 
                    </span>
                    <div class="note-info">
                        <p contenteditable="false" class="note_title_${i}">${list.Title}</p>
                        <p contenteditable="false" class="note_description_${i}">${list.Description}</p>
                        <input class="dn" type="text" value="${list._id}" id="localid_${i}">
                    </div>
                    <div class="note_action">
                            <a class="link-style edit primary" href="javascript:void(0)" id="edit_${i}">Edit</a>
                            <a class="link-style update primary dn" href="javascript:void(0)" id="update_${i}">Update</a>
                            <a class="link-style wip progress  ${(list.carrdtype==='wip') ? 'dn' : ''} " href="javascript:void(0)" id="wip_${i}">Wip</a>
                            <a class="link-style done complete ${(list.carrdtype==='done') ? 'dn' : ''} " href="javascript:void(0)" id="done_${i}">Done</a>
                    </div>
                </div>`;

        if (list.carrdtype === 'done') {
          donelist += temp;
        } else if (list.carrdtype === 'wip') {
          wiplist += temp;
        } else {
          todolist += temp;
        }
      });
      this.el.innerHTML = todolist;
      this.wipEle.innerHTML = wiplist;
      this.doneEle.innerHTML = donelist;
    } else {
      this.el.innerHTML = '';
      this.wipEle.innerHTML = '';
      this.doneEle.innerHTML = '';
    }
  };


  this.getBoardDetails = function () {
    // eslint-disable-next-line no-undef
    BOARD_SERVICES.getBoardDetails(this.urlData('id')).then((data) => {
      if (data.boardDetails) {
        this.boardIdele.value = data.boardDetails._id;
        this.boardname.innerHTML = data.boardDetails.Title;
      } else {
        this.addBtnEle.remove();
      }

      if (data.listsDetails && data.listsDetails.length > 0) {
        this.renderall(data.listsDetails);
      }
    });
  };

  this.urlData = function (name, url) {
    // eslint-disable-next-line no-restricted-globals
    if (!url) {
      url = location.href;
    }
    const regexS = `[\\?&]${name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')}=([^&#]*)`;
    const regex = new RegExp(regexS);
    const results = regex.exec(url);
    return results == null ? null : results[1];
  };

  this.Delete = function (event) {
    const index = event.target.id.split('_')[1];
    const cardid = document.getElementById(`localid_${index}`).value;
    const boardid = this.boardIdele.value;
    const payload = { cardid, boardid };
    // eslint-disable-next-line no-undef
    BOARD_SERVICES.deleteCard(payload).then((data) => {
      if (data.list) {
        this.renderall(data.list);
      }
    });
  };

  this.updateNote = function (event) {
    const index = event.target.id.split('_')[1];
    const localid = document.getElementById(`localid_${index}`).value;
    const Title = document.getElementsByClassName(`note_title_${index}`)[0].textContent;
    const Description = document.getElementsByClassName(`note_description_${index}`)[0].textContent;
    const payload = { localid, Title, Description };
    if (Title !== '' && Description !== '') {
      // eslint-disable-next-line no-undef
      BOARD_SERVICES.updateCard(payload).then(() => {
        this.toggleEditState('DEACTIVE', event);
      });
    }
  };

  this.bindEvents = function () {
    this.addBtnEle.addEventListener('click', this.AddList.bind(this));
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

      if (event.target.classList.contains('wip')) {
        this.changeStatus(event, 'wip');
      }
      if (event.target.classList.contains('done')) {
        this.changeStatus(event, 'done');
      }
    });
  };

  this.changeStatus = function (event, status) {
    const index = event.target.id.split('_')[1];
    const localid = document.getElementById(`localid_${index}`).value;
    const boardid = this.boardIdele.value;
    const payload = { localid, status, boardid };

    // eslint-disable-next-line no-undef
    BOARD_SERVICES.statusChange(payload).then((data) => {
      if (data.list) {
        this.renderall(data.list);
      }
    });
  };
  this.init = function () {
    this.getBoardDetails();
    this.bindEvents();
  };
}();

applist.init();
