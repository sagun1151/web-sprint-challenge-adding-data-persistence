// build your server here and require it from index.js
const express = require('express');
const pRouter = require('./project/router');
const rRouter = require('./resource/router');
const tRouter = require('./task/router')

const server = express();

server.use(express.json());
server.use('/api/projects', pRouter);
server.use('/api/resources', rRouter);
server.use('/api/tasks', tRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
