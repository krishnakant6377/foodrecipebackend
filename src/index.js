const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
const {router} = require("../src/routes/user")
const {reciperouter} = require("./routes/Recipes")

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use("/auth", router)
app.use("/recipes", reciperouter)

mongoose.connect("mongodb+srv://krishnakant:vermakrishnakant636@recipes.14x7f75.mongodb.net/recipes?retryWrites=true&w=majority",
    {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    })
app.get("/", (req, res) => {
    res.send("working")
})
app.listen(4000, () => console.log("Server STARTED"))