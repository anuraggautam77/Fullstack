/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names  */
/* eslint-env browser */
class Board {
	constructor() {
		// eslint-disable-next-line no-undef
		this.connectionEstablised();
		this.el = document.getElementById('allBoards');
		this.addBtnEle = document.getElementById('addBoard');
		this.title_ele = document.getElementById('boardtitle');
		this.discription_ele = document.getElementById('boarddescription');
		this.notes = [];
		this.addBoard = this.addBoard.bind(this);
		this.subscribeEvents();
	}

	connectionEstablised() {
		this.socket = io.connect(window.location.origin, { query: `loggeduser=${this.readCookie('username')}` });
	}

	readCookie(name) {
		const nameEQ = `${name}=`;
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	bindEvents() {
		this.addBtnEle.addEventListener('click', this.addBoard);

		document.body.addEventListener('click', (event) => {
			if (event.target.classList.contains('edit')) {
				this.toggleEditState('ACTIVE', event);
			}
			if (event.target.classList.contains('update')) {
				this.updateBoard(event);
			}

			if (event.target.classList.contains('delete')) {
				this.deleteBoard(event);
			}
		});
	}

	subscribeEvents() {
		this.socket.on('BROADCAST_BOARD_LIST', (list) => {
			this.renderall(list);
		});

		this.socket.on('BROADCAST_UPDATED_BOARD_DETAIL', (board) => {
			const updatedBoardele = document.querySelector(`[noteid="${board.id}"]`);
			if (updatedBoardele) {
				updatedBoardele.getElementsByClassName('note_title')[0].textContent = board.Title;
				updatedBoardele.getElementsByClassName('note_description')[0].textContent = board.Description;
			}
		});
	}

	// eslint-disable-next-line class-methods-use-this
	renderCount(data) {
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
	}

	renderall(boards) {
		this.renderCount(boards.length);
		if (boards.length > 0) {
			const noteslist = boards.map(
				(board, i) => `<div class="note" noteid=${board._id}>\
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
</div>`
			);
			this.el.innerHTML = noteslist.join('');
		} else {
			this.el.innerHTML = '';
		}
	}

	addBoard() {
		if (this.title_ele.value && this.discription_ele.value) {
			const payload = { Title: this.title_ele.value, Description: this.discription_ele.value };
			// eslint-disable-next-line no-undef
			this.title_ele.value = '';
			this.discription_ele.value = '';
			BOARD_SERVICES.addNewBoard(payload).then((data) => {
				if (data.success) {
					// eslint-disable-next-line no-console
					console.log('Message>>', data.message);
				}
			});
		}
	}

	updateBoard(event) {
		const index = event.target.id.split('_')[1];
		const noteid = document.getElementById(`localid_${index}`).value;
		const Title = document.getElementsByClassName(`title_${index}`)[0].textContent;
		const Description = document.getElementsByClassName(`description_${index}`)[0].textContent;
		const payload = { noteid, Title, Description };
		if (Title !== '' && Description !== '') {
			BOARD_SERVICES.updateBoard(payload).then(() => {
				this.toggleEditState('DEACTIVE', event);
			});
		}
	}

	deleteBoard(event) {
		const index = event.target.id.split('_')[1];
		const noteid = document.getElementById(`localid_${index}`).value;
		const payload = { noteid };
		// eslint-disable-next-line no-undef
		BOARD_SERVICES.deleteBoard(payload).then((data) => {
			if (data.success) {
				console.log('Message>>', data.message);
			}
		});
	}

	toggleEditState(state, event) {
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
	}

	getAllBoards() {
		// eslint-disable-next-line no-undef
		BOARD_SERVICES.getAllBoards().then((data) => {
			if (data.status == 500) {
				window.location.href = '/';
			} else {
				this.renderall(data.list);
			}
		});
	}

	init() {
		this.getAllBoards();
		this.bindEvents();
	}
}

const instance = new Board();
instance.init();
