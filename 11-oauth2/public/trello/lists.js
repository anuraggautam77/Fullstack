/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names  */
/* eslint-env browser */
/* eslint class-methods-use-this: "error" */

class BoardDetails {
  constructor() {
    this.bodyEle = document.body;
    this.socket = io.connect(window.location.origin, { query: `loggeduser=${this.readCookie('username')}` });
    this.boardname = document.getElementById('boardname');
    this.addListBtnEle = document.getElementById('createlist');
    this.listTitleEle = document.getElementById('listTitle');
    this.boardListEle = document.getElementById('boardList');
    this.boardIdele = document.getElementById('boardid');
    this.el = document.getElementById('todo-container');
    this.wipEle = document.getElementById('wip-container');
    this.doneEle = document.getElementById('done-container');
    this.userListEle = document.getElementsByClassName('user-tags');
    this.BoardId = null;
    this.dragItem = null;
    this.subscribeEvents();
  }

  readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  subscribeEvents() {
    this.socket.on('BROADCAST_LIST', (list) => {
      this.renderBoardList(list);
    });
    this.socket.on('BROADCAST_CARD', (cards) => {
      this.renderAllCard(cards);
    });

    this.socket.on('DROP_CARD_TO_LIST', (obj) => {
      const arrlistconatiner = [...document.getElementById(`card-container_${obj.prev}`).children];
      arrlistconatiner.map((card) => {
        if (obj.list._id === card.id.split('_')[2]) {
          card.remove();
        }
      });
    });


    this.socket.on('BROADCAST_UPDATE_CARD', (card) => {
      document.getElementsByClassName(`note_title_${card.id}`)[0].textContent = card.Title;
      document.getElementsByClassName(`note_description_${card.id}`)[0].textContent = card.Description;
    });

    this.socket.on('BROADCAST_DELETE_CARD', (card) => {
      if (document.getElementsByClassName(`list_card_${card}`).length > 0) {
        document.getElementsByClassName(`list_card_${card}`)[0].remove();
      }
    });
  }

  bindEvents() {
    this.addListBtnEle.addEventListener('click', this.addListHandler.bind(this));
    this.bodyEle.addEventListener('click', (event) => {
      if (event.target.classList.contains('addCard')) {
        this.addCard(event);
      }

      if (event.target.classList.contains('edit')) {
        this.toggleEditState('ACTIVE', event);
      }

      if (event.target.classList.contains('update')) {
        this.updateNote(event);
      }

      if (event.target.classList.contains('delete')) {
        this.deleteCard(event);
      }
    }, false);

    /**
     * Drag a card
     */
    this.bodyEle.addEventListener('drag', (event) => {
      event.preventDefault();
    }, false);

    this.bodyEle.addEventListener('dragover', (event) => {
      event.preventDefault();
    });


    this.bodyEle.addEventListener('dragstart', (event) => {
      if (event.target.classList.contains('list')) {
        const fromConatiner = this.findAncestor(event.target, 'list-container');
        this.dragItem = event.target;
        event.dataTransfer.setData('dragEle', event.target.id);
        event.dataTransfer.setData('fromListCon', fromConatiner);
      }
    }, false);

    this.bodyEle.addEventListener('drop', (event) => {
      event.preventDefault();
      const whereTodropConatiner = this.findAncestor(event.target, 'list-container');
      const listIdToDrop = whereTodropConatiner.split('_')[1];
      const fromListConatiner = event.dataTransfer.getData('fromListCon');
      const prevlistContainerId = fromListConatiner.split('_')[1];

      if (listIdToDrop !== prevlistContainerId) {
        if (event.target.classList.contains('list-container') || (whereTodropConatiner !== null)) {
          const dropcontainerid = event.dataTransfer.getData('dragEle');
          document.getElementById(whereTodropConatiner).insertAdjacentHTML('beforeend', document.getElementById(dropcontainerid).outerHTML);
          this.dragItem.remove();
          const dropCardId = dropcontainerid.split('_')[2];
          BOARD_SERVICES.cardPlacement(listIdToDrop, dropCardId, prevlistContainerId);
        }
      }
    }, false);
  }

  findAncestor(el, cls) {
    if (!el.classList.contains(cls)) {
      // eslint-disable-next-line no-cond-assign
      while ((el = el.parentElement) && !el.classList.contains(cls));
      if (el !== null) {
        return el.id;
      }
      return null;
    }
    return el.id;
  }


  addListHandler() {
    if (this.listTitleEle.value && this.boardIdele.value) {
      const payload = {
        bid: this.boardIdele.value,
        Title: this.listTitleEle.value,
      };

      this.listTitleEle.value = '';
      // eslint-disable-next-line no-undef
      BOARD_SERVICES.addNewList(payload).then((data) => { });
    }
  }


  addCard(event) {
    const index = event.target.id.split('_')[1];
    const title = document.getElementById(`cardTitle_${index}`).value;
    const desc = document.getElementById(`cardDesc_${index}`).value;
    if (title && desc && index) {
      const payload = {
        Listid: index,
        Title: title,
        Description: desc,
        Boardid: this.BoardId,
      };

      document.getElementById(`cardTitle_${index}`).value = '';
      document.getElementById(`cardDesc_${index}`).value = '';

      BOARD_SERVICES.addNewCard(payload).then(() => { });
    }
  }

  toggleEditState(state, event) {
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
  }


  rand(min, max) {
    const offset = min;
    const range = (max - min) + 1;
    const randomNumber = Math.floor(Math.random() * range) + offset;
    return randomNumber;
  }


  renderAllCard(cards) {
    if (cards.length > 0) {
      cards.map((list) => {
        const arr = [1, 2, 3, 4];
        const styleIndex = arr[this.rand(0, 3)];
        const temp = `<div class="list list_card_${list._id}" id="list_card_${list._id}" draggable="true" > 
                  <div class="cardstyle rotate_${styleIndex}">
                    <span class="cross_btn" > 
                        <b>
                            <a class="dangercross"  href="javascript:void(0)" ><i id="delete_${list._id}" class="fa delete fa-times" aria-hidden="true"></i></a>
                        </b> 
                    </span>
                    <div class="note-info">
                        <p contenteditable="false" class="note_title note_title_${list._id}">${list.Title}</p>
                        <p contenteditable="false" class="note_description note_description_${list._id}">${list.Description}</p>
                        <input class="dn" type="text" value="${list._id}" id="localid_${list._id}">
                    </div>
                    <div class="note_action">
                            <a class="link-style edit primary" href="javascript:void(0)" id="edit_${list._id}">Edit</a>
                            <a class="link-style update primary dn" href="javascript:void(0)" id="update_${list._id}">Update</a>
                    </div>
                    </div>
                </div>`;
        document.getElementById(`card-container_${list.Listid}`).insertAdjacentHTML('beforeend', temp);
      });
    }
  }


  getBoardDetails() {
    // eslint-disable-next-line no-undef


    this.BoardId = this.urlData('id');
    BOARD_SERVICES.getBoardDetails(this.BoardId).then((data) => {
      if (data.boardDetails) {
        this.boardIdele.value = data.boardDetails._id;
        this.boardname.innerHTML = data.boardDetails.Title;
        if (data.boardDetails.userBelongs.length > 0) {
          const userlist = data.boardDetails.userBelongs;
          const template = userlist.map(user => ` <span id='tag_${user._id}' class="tag label label-info">${user.name}</span>`);
          this.userListEle[0].innerHTML = template.join('');
        }
      } else {
        this.boardname.innerHTML = data.message;
        document.getElementsByClassName('main-body')[0].remove();
      }


      if (data.lists && data.lists.length > 0) {
        this.renderBoardList(data.lists);
        if (data.cards && data.cards.length > 0) {
          this.renderAllCard(data.cards);
        }
      }
    });
  }


  renderBoardList(lists) {
    if (lists.length > 0) {
      lists.map((list, i) => {
        const listTemp = `<div class="todo-pannel">
    <div class="inner-panel">
        <div class="listtitle">${list.Title}</div>
        <div class="add-container ">
            <div>
                <input type="text" id="cardTitle_${list._id}" placeholder="Card Title" name="cardTitle" value="">
            </div>
            <div>
             <input type="text" id="cardDesc_${list._id}" placeholder="Card Description" name="cardDesc" value="">
            </div>
            <input type="text" class="dn" value="${list._id}">
            <a class="link-style addCard secondary" href="javascript:void(0)" id="addCard_${list._id}">Add Card</a>
        </div>
        <div> 
        <div class="bottom-line"> </div>
         <div class="list-container" id="card-container_${list._id}"> </div>
        </div>
    </div>
</div>`;
        this.boardListEle.insertAdjacentHTML('beforeend', listTemp);
      });
    }
  }


  urlData(name, url) {
    // eslint-disable-next-line no-restricted-globals
    if (!url) {
      url = location.href;
    }
    const regexS = `[\\?&]${name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')}=([^&#]*)`;
    const regex = new RegExp(regexS);
    const results = regex.exec(url);

    return results == null ? null : results[1];
  }

  deleteCard(event) {
    const index = event.target.id.split('_')[1];
    const cardid = document.getElementById(`localid_${index}`).value;
    const boardid = this.boardIdele.value;
    const payload = { cardid, boardid };
    // eslint-disable-next-line no-undef
    BOARD_SERVICES.deleteCard(payload).then((data) => {

    });
  }

  updateNote(event) {
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
  }


  init() {
    this.getBoardDetails();
    this.bindEvents();
  }
}

const instance = new BoardDetails();
instance.init();
