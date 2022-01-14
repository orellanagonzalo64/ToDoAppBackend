const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
    try {

      const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log("unable to register");
      res.status(500).json("unable to register");
    }
  });

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne ({email: req.body.email});

    if (user === null) {
      res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(validPassword) {
      user.password = "";
      res.status(200).json(user);
    }
    else{
      console.log("Invalid");
      res.status(400).json("Invalid");
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



  module.exports = router;
