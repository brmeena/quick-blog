const express = require("express");
const Router=express.Router();
Router.use("/blogpost/",require("./blogpost/blogpost.controller"));
Router.use("/user/",require("./user/user.controller"));
module.exports = Router;


