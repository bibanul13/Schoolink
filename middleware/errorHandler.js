//!!READ THE README.md FILE
//error handling middleware
const errorHandler = async (err, req, res, next) => {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
    next();
  };

module.exports = errorHandler;