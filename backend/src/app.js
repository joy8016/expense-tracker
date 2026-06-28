import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRoute from "./routes/userRegister.route.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// endpoint for register router

app.use('/api/auth', authRoute)


export default app