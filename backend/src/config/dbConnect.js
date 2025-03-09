const mongoose = require("mongoose")
let database;

const dbConnnect = async() => {
    try{
        const connect = await mongoose.connect(process.env.ATLAS_URI)
        database = connect.connection
        console.log("Database connected, host is ", database.host)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
   
}

const getDb = () => {
    return database
}

module.exports = {dbConnnect,getDb}