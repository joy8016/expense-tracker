import app from "./src/app.js"
import connectionDB from "./src/config/db.js"

connectionDB()

app.listen(3020, ()=>{
  console.log("server is running on 3000 port")
})