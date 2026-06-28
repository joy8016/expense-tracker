import mongoose from "mongoose";
import config from "../config/config.js";

async function connectionDB() {
  try{
    await mongoose.connect(config.MONGO_URI)
    console.log("databse connected succussfully")
  }
  catch(err){
    console.log(`the error is ${err}`)
  }
  
}

export default connectionDB