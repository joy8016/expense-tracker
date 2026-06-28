import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:[true, "username is must be required"]
  },
  email:{
    type:String,
    reruired:[true, "email is must be required"]
  }, 
  password:{
    type:String,
    required:[true, "password must be required"]
  }
})

const userModel = mongoose.model("user", userSchema)
export default userModel