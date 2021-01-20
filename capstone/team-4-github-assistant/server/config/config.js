module.exports = {
  mongodburi: (process.env.NODE_ENV !== 'production') ? 'mongodb://localhost:27017/myapp' : 'mongodb://deepan26:deepanpwd26@ds123346.mlab.com:23346/gitbot',
  auth: {
    secret: 'SECRET_KEY_KANBAN_APP',
    saltRounds: 5
  },
  gitApp: {
    clientId: (process.env.NODE_ENV === 'production') ? '285b585ba53d4de3a5d9' : '36f0ca7b0277097ae151',
    clientSecret: (process.env.NODE_ENV === 'production') ?  '10ad9dc4bab29f1f817e8195f7514f8215b4a9dc' : '361ac93b41628fb6973bf3cdc1832d5724c9e98c'
  },
  gitApiUrl: {
    'listLoggedInUserRepo': 'https://api.github.com/user/repos',
  }
};
