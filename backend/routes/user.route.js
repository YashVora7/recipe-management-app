const {Router} = require("express")
const { userRegister, userLogin } = require("../controllers/user.controller")
const userRouter = Router()

userRouter.post("/signup",userRegister)
userRouter.post("/login",userLogin)

module.exports = userRouter