class Application {
  constructor() {
    this.loginuser = document.getElementById('loginusername');
    this.loginpassword = document.getElementById('loginpassword');
    this.loginbtn = document.getElementById('loginbtn');

    this.registeruser = document.getElementById('username');
    this.name = document.getElementById('name');
    this.regsiterpassword = document.getElementById('password');
    this.registerbtn = document.getElementById('registerbtn');

    this.loginUser = this.loginUser.bind(this);
    this.regsiterUser = this.regsiterUser.bind(this);
  }


  loginUser() {
    if (this.loginuser.value !== '' && this.loginpassword.value !== '') {
      fetch('/user/login', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(
          {
            username: this.loginuser.value,
            password: this.loginpassword.value,
          },
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json().then((json) => {
        if (json.success) {
          window.location.href = '/trello/';
        } else {
          alert(json.message);
        }
      }));
    }
  }


  regsiterUser() {
    if (this.name.value !== '' && this.registeruser.value !== '' && this.regsiterpassword.value !== '') {
      fetch('/user/register', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(
          {
            username: this.registeruser.value,
            password: this.regsiterpassword.value,
            name: this.name.value,
          },
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => response.json().then((json) => {
        if (json.success) {
          // eslint-disable-next-line no-alert
          alert('User Registered Sucessfully!!');
        } else {
          alert(json.message);
        }
      }));
    }
  }

  bindEvnts() {
    this.loginbtn.addEventListener('click', this.loginUser);
    this.registerbtn.addEventListener('click', this.regsiterUser);
  }

  init() {
    this.bindEvnts();
  }
}

const appLogin = new Application();
appLogin.init();
