const mongoose = require('mongoose');

const config = require('./config/config.js');

const db = () => {
  const connectionURL = process.env.DBURL || config.mongodburi;

  console.log('BD coneection>>>>>>>>>>>>>');
  console.log(connectionURL);

  mongoose.connect(connectionURL, { useNewUrlParser: true });
  const connection = mongoose.connection;
  connection.on('error', console.error.bind(console, 'connection error'));
  connection.once('open', () => {
    console.log('Connected to mongo db');
  });
  mongoose.set('debug', true);
};

module.exports = db;
