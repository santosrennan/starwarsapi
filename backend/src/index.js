const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

// gerador de log de requisição 
const logger = require('morgan');
const fs = require('fs');
app.use(logger('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(logger('dev'));

//Middleware
app.use(cors());
app.use(express.json());

//routes
app.use(routes);


//portas
const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Backend listening ${port}`);
})

  //Não esqueça de dar npm ou yarn install para instalar as dependencias do packagejson
