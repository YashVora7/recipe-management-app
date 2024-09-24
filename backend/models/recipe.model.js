const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

const recipeModel = new mongoose.model("recipe",recipeSchema)

module.exports = recipeModel