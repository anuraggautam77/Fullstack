const mongoose = require('mongoose');

const config = require('./config/config.js');

const db = () => {
  const connectionURL = process.env.DBURL || config.mongodburi;

  // eslint-disable-next-line no-console
  console.log('BD coneection>>>>>>>>>>>>>');
  // eslint-disable-next-line no-console
  console.log(connectionURL);

  mongoose.connect(connectionURL, { useNewUrlParser: true });
  // eslint-disable-next-line prefer-destructuring
  const connection = mongoose.connection;
  // eslint-disable-next-line no-console
  connection.on('error', console.error.bind(console, 'connection error'));
  connection.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Connected to mongo db');
  });
  mongoose.set('debug', true);
};

module.exports = db;
