require('dotenv').config();
const mongoose = require('mongoose');


const MONGO_URI=process.env.MONGO_URI;

console.log(MONGO_URI);
const connectDB =async()=>{
    try{
        const connection =await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        
        console.log(`MongoDB connected: ${connection.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;