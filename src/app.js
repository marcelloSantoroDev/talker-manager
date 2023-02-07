const express = require('express');
const routers = require('./routers');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.use(routers);

module.exports = app;