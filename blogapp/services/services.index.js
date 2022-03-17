const express = require("express");
const Router=express.Router();
Router.use("/login/",require("./authentication/auth.controller"));
Router.use("/install/",require("./install/install.controller"));
Router.use("/upload/",require("./upload/upload.controller"));

module.exports = Router;
