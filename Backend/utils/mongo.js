import mongoose from 'mongoose';

export const mongoDB=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDb Connected");
   }
   catch(err){
    console.log("MongoDb Connection Failed");
   }
}