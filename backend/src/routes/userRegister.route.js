import express from "express"
import *as userController from "../controllers/userRegister.controller.js"

const authRoute = express.Router()

// Register route

authRoute.post('/register', userController.registerController)

authRoute.post('/login', userController.loginUser)

authRoute.get('/get-me', userController.getme)

// authRoute.get("/refreshToken", userController.refreshToken)

authRoute.put("/update", userController.userUpdate)



export default authRoute