const mongoose = require('mongoose');

const connectDb = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {//writing the next three lines so that the console doesnt give any errors
        /*useNewUrlParse: true,
        useCreateIndex: true,
        useFindAndModify: false*/
    });
    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.underline.bold);
}
module.exports = connectDb;