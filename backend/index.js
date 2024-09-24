const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/user.route")
const recipeRouter = require("./routes/recipe.route")
const connect = require("./config/db")
const auth = require("./middlewares/auth.middleware")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/recipe",auth,recipeRouter)

app.listen(PORT,()=>{
    console.log(`Port is running on ${PORT}`);
    connect()
})