const ErrorResponse = require('../utils/errorResponse') 

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    //Log to the console
    error.message = err.message;
    
    console.log(err.stack.red);

    //Mongoose bad object id
    if(err.name === 'CastError')
    {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    //Mongoose dulpicate key
    if(err.code === 11000)//MongoError code is 11000
    {
        const message = `Duplicate field value with id ${err.value}`;
        error = new ErrorResponse(message, 400); 
    }

    //Mongoose validation error
    if(err.name === 'ValidationError')
    {
        const message = Object.values(err.errors).map(val => val.message)//to extract the error message from the object err and putting them in a map
        error = new ErrorResponse(message, 400);
    }    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}
module.exports = errorHandler