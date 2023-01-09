var express = require('express');
var router = express.Router();
var User = require("../models/usermodel");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");


router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup',async function(req, res, next) {
  let user = await User.findOne({email:req.body.email})
  if (user)
  return res.status(400).send("User with given Email already exists")
  user = new User(req.body)
  let salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  await user.save()
  res.redirect('/')
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Invalid Password");
  else res.redirect('/products')
  let token = jwt.sign(
    { _id: user._id, name: user.name },
    config.get("jwtPrivateKey")
  );
  req.session.user = user;
  console.log(req.session.user)

});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  return res.redirect('/login');
}); 

module.exports = router;
