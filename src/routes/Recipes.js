const express = require("express")
const mongoose = require("mongoose")
const RecipeModel=require("../models/Recipes")
const userModel=require("../models/Users")


const  reciperouter=express.Router()

reciperouter.get("/", async (req, res) => {
    try {
      const result = await RecipeModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

reciperouter.post("/",async (req,res)=>{
    const recipe=new RecipeModel(req.body)

    try {
        const response=recipe.save()
        res.json(response);
    } catch (error) {
        res.json(error)
    }
})

reciperouter.put("/",async (req,res)=>{
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
  })

reciperouter.get("/savedrecipe/ids/:userId",async(req,res)=>{
    try {
       const user=await userModel.findById(req.params.userId)
        res.json({savedRecipes:user?.savedRecipes})
    } catch (error) {res.json(error)
        
    }
})
reciperouter.get("/savedrecipe/:userId",async(req,res)=>{
    try {
       const user=await userModel.findById(req.params.userId)
       const savedRecipes=await RecipeModel.find({_id:{$in:user.savedRecipes}})
        res.json({savedRecipes})
    } catch (error) {res.json(error)
        
    }
})

module.exports = { reciperouter }