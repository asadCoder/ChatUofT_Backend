const mongoose = require('mongoose');
require ('dotenv').config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.mongo_URL).then(
    ()=>{
        console.log("Connected to database")
    }
).catch((err)=> {
    console.log("Error connecting to DB" + err);
})