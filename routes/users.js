const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const users = require('../controllers/users');
const User = require("../models/user");
const passport = require("passport");

router.route('/register')
      .get(users.renderRegister)
      .post(catchAsync(users.register));

router.route('/login')
      .get(users.renderLogin)
      .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login", }), users.login);

router.get("/logout", users.logout);

module.exports = router;
