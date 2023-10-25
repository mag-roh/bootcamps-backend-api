const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
//const logger = require('./middleware/logger')
const connectDb = require('./config/db')
//load environemnt variables
dotenv.config({ path: "./config/config.env" });

//connection to database
connectDb();
// Route files
const bootcamps = require('./routes/bootcamps.js');
const app = express();

//Body parser
app.use(express.json());
//dev logging middleware
if(process.env.NODE_ENV === 'development') {
     app.use(morgan('dev'));
}
//app.use(logger);we are using morgan instead of logger
//Mount routes
app.use('/api/v1/bootcamps', bootcamps)//the base route, the other part is taken from the bootcamps file
    //res.send('Hello from express');
    // res.send('<h1>Hello from express<h1>');
    // res.send({ name: 'mag'});
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
console.log(`Error: ${err.message}`.red);
//close server and exit process
server.close(() => process.exit(1));
});