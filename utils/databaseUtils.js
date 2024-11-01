const mongoose = require("mongoose")

const connectToDb = () =>{
    try {
        mongoose.connect(process.env.DB_URL)
        console.log('Connected to Mongo database');
    } catch (error) {
        console.log("Error while connecting to DB:", error)
    }
}

module.exports.connectToDb = connectToDb