//basic server setup on localhost
const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const useRouter = require('./api/users/user.router');
const errorHandler = require('./middleware/errorHandler');
let expressValidator = require('express-validator');

/*
  In case i forget req types :))
  app.get() =  STH
  app.post() = CREATE STH
  app.put() = CHANGE STH
  app.delete() =REMOVE STH
*/
//use body parser for generating .body object in req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Port definition in .env
const port = process.env.SERVER_PORT;

//Console.log a request
app.use('/', (req, res, next) => {
  console.log(`Request was made at ${req.url}`);
  next();
});

//router usage , defined in api/user/routes
app.use('/api', useRouter);

//handle basic errors, defined in middleware/errorHandler
app.use(errorHandler);

//console.log when the connection is made
app.listen(port, () => console.log(`Connected on port  ${port}`));