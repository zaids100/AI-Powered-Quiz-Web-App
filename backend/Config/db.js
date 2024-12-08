const mongoose=require('mongoose');
require('dotenv').config();

const connectDb=async()=>{
      try{
          await mongoose.connect(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
          console.log("Connected to Database");
      }
      catch(err){
           console.log("Error connecting to DB",err);
      }
}

module.exports=connectDb;