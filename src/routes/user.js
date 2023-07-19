const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userModel = require("../models/Users")

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
        return res.json({ message: "user already EXISTS try to login " })
    }

    const hashp = await bcrypt.hash(password, 10)
    const newuser = new userModel({ username, password: hashp })
    await newuser.save()
    res.json({ message: "user registered Successfully" })


})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
        return res.json({ message: "user doesnot exits please try to register first" })
    }
    const ispasswordvalid = await bcrypt.compare(password, user.password);
    if (!ispasswordvalid) {
        return res.json({
            message: "password is incorrect"
        })
    }
    const token = jwt.sign({ id: user._id }, "secretkey");
    res.json({ token, userId: user._id })


})
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      jwt.verify(authHeader, "secretkey", (err) => {
        if (err) {
          return res.sendStatus(403);
        }
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

module.exports = { router ,verifyToken}
