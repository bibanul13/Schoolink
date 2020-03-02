//test API for Schoolink
const express = require('express');
require("dotenv").config();
const bodyParser= require('body-parser');
const app = express();
const useRouter = require('./api/users/user.router');
const errorHandler = require('./middleware/errorHandler');

/*app.get() =  STH
  app.post() = CREATE STH
  app.put() = CHANGE STH
  app.delete() =REMOVE STH
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//Port definition 
const port = process.env.SERVER_PORT;

//See when a request was made in the console
app.use('/',(req, res, next) =>{
    console.log(`Request was made at ${req.url}.`);
    next();
});

//routes for diferent requests
app.use('/api', useRouter);

//handle basic errors

app.use(errorHandler);

app.listen(port, () => console.log(`Connected on port  ${port}`));

