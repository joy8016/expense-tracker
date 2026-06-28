import dotenv from "dotenv"

dotenv.config()

if(!process.env.MONGO_URI){
  console.log("MONGO_URI must be required")
}
if(!process.env.JWT_SECRET){
  console.log("JWT_SECRET must be required")
}

const config={
  MONGO_URI:process.env.MONGO_URI,

  JWT_SECRET:process.env.JWT_SECRET
}

export default config