
import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';


const MONGO_URI=process.env.MONGO_URI;

console.log(MONGO_URI);
const connectDB =async()=>{
    try{
        const connection =await mongoose.connect(process.env.MONGO_URI,{
        });
        
        console.log(`MongoDB connected: ${connection.connection.host}`);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export {connectDB};