const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load env variables
dotenv.config({ path: './config/config.env' });

//Load models
const Bootcamp = require('./models/Bootcamp');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {//writing the next three lines so that the console doesnt give any errors
        /*useNewUrlParse: true,
        useCreateIndex: true,
        useFindAndModify: false*/
});
    
//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')//__dirname describes the current directory
);

//Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data Imported...'.green.inverse)
            process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Delete data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data Destroyed...'.red.inverse)
            process.exit();
    } catch (err) {
        console.error(err);
    }
}

if (process.argv[2] === '-i') {//the second argument in the statement node seeder -i
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}