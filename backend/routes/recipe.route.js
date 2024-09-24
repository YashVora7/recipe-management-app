const {Router} = require("express")
const { recipeAdd, recipeGet, recipeGetById, recipeUpdate, recipeDelete } = require("../controllers/recipe.controller")
const recipeRouter = Router()

recipeRouter.post("/add",recipeAdd)
recipeRouter.get("/get",recipeGet)
recipeRouter.get("/get/:id",recipeGetById)
recipeRouter.patch("/update/:id",recipeUpdate)
recipeRouter.delete("/delete/:id",recipeDelete)

module.exports = recipeRouter