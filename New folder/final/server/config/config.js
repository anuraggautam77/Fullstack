module.exports = {
  mongodburi: 'mongodb://localhost:27017/myapp',
  auth: {
    secret: 'SECRET_KEY_KANBAN_APP',
    saltRounds: 5
  },
  gitApp: {
    clientId: '36f0ca7b0277097ae151',
    clientSecret: '361ac93b41628fb6973bf3cdc1832d5724c9e98c'
  },
  gitApiUrl: {
    'listLoggedInUserRepo': 'https://api.github.com/user/repos',
  }
};
