const mongoose = require("mongoose")

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String }],
    instructions: { type: String, required: true },
    image: {
        type: String
    },
    cookingTime: {
        type: Number
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId ,ref:"users",required:true
    }
})
const RecipeModel = mongoose.model("recipes", RecipeSchema)
module.exports = RecipeModel