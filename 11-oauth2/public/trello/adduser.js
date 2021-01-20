/* eslint-disable class-methods-use-this */
class AddUser {
  constructor() {
    this.addbtn = document.getElementById('adduser');
    this.userListEle = document.getElementsByClassName('user-tags');
    this.bindEvents();
  }

  bindEvents() {
    this.addbtn.addEventListener('click', this.adduserHandler.bind(this));
  }

  adduserHandler() {
    const select = document.getElementById('selectuser');
    const newuserid = document.getElementById('selectuser').value;
    const selectedlabel = select[select.selectedIndex].label;
    const boardid = document.getElementById('boardid').value;
    BOARD_SERVICES.addUserInboard({ newuserid, boardid })
      .then((res) => {
        if (document.getElementById(`tag_${newuserid}`)) {
          // eslint-disable-next-line no-alert
          alert('Already Added in board!!!');
        } else {
          const template = `<span id='tag_${newuserid}' class="tag label label-info">${selectedlabel}</span>`;
          this.userListEle[0].insertAdjacentHTML('beforeend', template);
        }
      });
  }

  getuserlist() {
    BOARD_SERVICES.getUserlist().then((data) => {
      this.populateDropDown(data.userlist);
    });
  }

  populateDropDown(userlist) {
    const dropdown = `<select id="selectuser">${userlist.map(a => `<option value=${a.id}>${a.name}</option>`)}<select>`;
    document.getElementsByClassName('userdropdwonhere')[0].innerHTML = dropdown;
  }

  init() {
    this.getuserlist();
  }
}
const addUser = new AddUser();
addUser.init();
