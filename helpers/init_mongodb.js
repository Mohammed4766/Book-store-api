const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL,{dbName:process.env.DBNAME}).then(()=>{
    console.log("mongodb is connect");
}).catch(
    (error) =>{
        console.log("connect failed to mongodb");
    }
);
