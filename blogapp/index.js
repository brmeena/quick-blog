const path = require("path");
const express=require("express");
const cors=require("cors");
var morgan = require('morgan')
const app= express();
const expressEdge = require("express-edge");
const mongoose= require("mongoose")
const config = require("./config/config.json")
const bodyParser=require("body-parser");
const { Post } = require("./database/db.models");
require("dotenv").config();
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}));
app.set("views",__dirname+"/views");
app.listen(process.env.PORT,()=>{
    console.log(`blogapp started at ${process.env.PORT} ...`);
});
console.log(`Db name is ${config.db_name}`);
mongoose.connect(process.env.mongoDbConnectionUri+"/"+config.db_name)
    .then(()=> { console.log("Db connect successful")})
    .catch(err=> console.log(`error is ${err}`,err))
    
app.get("/",async(req,res)=>{
    handleHomePage(res);
});
app.get("/index.*",async(req,res)=>{
    handleHomePage(res);
});

app.use("/api/resources/",require("./resources/resources.index"))
app.use("/api/services/",require("./services/services.index"))
app.use("/posts/",require("./viewcontrollers/view.post.controller"));

const handleHomePage= async(res)=> {
    const posts=await Post.find({});
    header_data={
        'title':"Home page of Simple Blog tool - Blog Post",
        'description':"It is simplest way to create blogs on net"
    };
    res.render("index",{posts:posts,header_data:header_data,process:process})
}

