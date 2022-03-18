const path = require("path");
const express=require("express");
const cors=require("cors");
var morgan = require('morgan')
const app= express();
const expressEdge = require("express-edge");
const mongoose= require("mongoose")
const cachegoose= require("recachegoose")
const config = require("./config/config.json")
const bodyParser=require("body-parser");
const { Post } = require("./database/db.models");
const blogService = require("./resources/blogpost/blogpost.service");
const categoryService = require("./resources/category/category.service");
const PaginationConfiguration = require("./constants/paginationconfig");
const urlutilities = require("./utilities/urlutilities")
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
cachegoose(mongoose, {
        engine: 'memory'
      });

app.get("/",async(req,res)=>{
    handleHomePage(req,res);
});
app.get("/index.*",async(req,res)=>{
    handleHomePage(req,res);
});
app.get("/category-(:title)-c(:id).html",async(req,res)=> {
    handleCategoryPage(req,res);
})

app.use("/api/resources/",require("./resources/resources.index"))
app.use("/api/services/",require("./services/services.index"))
app.use("/posts/",require("./viewcontrollers/view.post.controller"));

const handleCategoryPage= async(req,res)=> {
    let page=1;
    if(req.query.page)
    {
        page=req.query.page;
    }

    const categoryObj= await categoryService.getByIdWithCache(req.params.id);
    const total_posts = await blogService.getTotalCategoryPostsWithCache(categoryObj._id);

    const categoryPosts= await blogService.getAllCategoryPostsWithCache(categoryObj._id,{"page":page});
    console.log(categoryPosts);
    let categories = await categoryService.getAllWithCache();
    let page_int=parseInt(page);
    let last_page=Math.ceil(total_posts/PaginationConfiguration.limit);
    let next_page=page_int+1
    if(next_page>last_page)
    {
        next_page=0;
    }
    let prev_page=page_int-1
    if(prev_page < 1)
    {
        prev_page=0;
    }
    header_data={
        'title':categoryObj.name+" - "+categoryObj.title+" - Blog Posts",
        'description':categoryObj.description,
        'categories': categories,
        'canonical_url': process.env.HOME_URL+"/category-"+urlutilities.getSeoFriendlyName(categoryObj.name)+"-c"+categoryObj._id+".html",
        'next_page':next_page,
        'prev_page':prev_page,
    };
    res.render("category",{posts:categoryPosts,category:categoryObj,header_data:header_data,process:process})

}
const handleHomePage= async(req,res)=> {
    let page=1;
    if(req.query.page)
    {
        page=req.query.page;
    }
    const total_posts = await blogService.getTotalPostCountWithCache();
    console.log("total posts" + total_posts);
    const posts=await blogService.getAllWithCache({"page":page});
    let categories = await categoryService.getAllWithCache();
    
    let page_int=parseInt(page);
    let last_page=Math.ceil(total_posts/PaginationConfiguration.limit);
    let next_page=page_int+1
    if(next_page>last_page)
    {
        next_page=0;
    }
    let prev_page=page_int-1
    if(prev_page < 1)
    {
        prev_page=0;
    }
    header_data={
        'title':"Home page of Simple Blog tool - Blog Post",
        'description':"It is simplest way to create blogs on net",
        'categories': categories,
        'canonical_url': process.env.HOME_URL,
        'next_page':next_page,
        'prev_page':prev_page,
    };

    res.render("index",{posts:posts,header_data:header_data,process:process})
}

