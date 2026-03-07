const mongoose = require("mongoose")

// function to connect to the database
const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("server is connected to db")
    } catch (error) {
        console.log("error connecting to db", error)
    }
    
}

module.exports = connectDb