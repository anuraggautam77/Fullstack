const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const noteRouter = require('./routes/NoteTaking');
const kanbanRouter = require('./routes/Kanban');
const collaborationRouter = require('./routes/Collaboration');

/**
 * Initialization
 */
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':true }));
app.use(bodyParser.json());


app.use('/api/notes', noteRouter);
app.use('/api/kanban', kanbanRouter);
app.use('/api/collaboration', collaborationRouter);


app.get('/', (req, res) => {
  res.send('Hello expressjs!');
});


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({ messgae: 'Not found' });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});