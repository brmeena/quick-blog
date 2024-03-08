const path = require("path");
const express=require("express");
const cors=require("cors");
var morgan = require('morgan');
const compression = require('compression');
const app= express();
const expressEdge = require("express-edge");
const edge = require('edge.js');
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
app.use(compression());
app.disable('x-powered-by');
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended": true}));
app.set("views",__dirname+"/views");
edge.global('process',process)
edge.global('log',function(logtxt){
    console.log(logtxt)
})
app.listen(process.env.PORT,()=>{
    console.log(`blogapp started at ${process.env.PORT} ...`);
});
console.log(`Db name is ${process.env.DB_NAME}`);
mongoose.connect(process.env.mongoDbConnectionUri+"/"+process.env.DB_NAME)
    .then(()=> { console.log("Db connect successful")})
    .catch(err=> console.log(`error is ${err}`,err))
cachegoose(mongoose, {
        engine: 'memory'
      });
var indexRouter = express.Router();
indexRouter.get("/",async(req,res)=>{
    handleHomePage(req,res);
});
indexRouter.get("/index.*",async(req,res)=>{
    handleHomePage(req,res);
});
indexRouter.get("/category-*-c(:id).html",async(req,res)=> {
    handleCategoryPage(req,res);
})

indexRouter.get("/post-*-i(:id).html",async(req,res)=> {
    handlePostPage(req,res);
})


indexRouter.use("/api/resources/",require("./resources/resources.index"))
indexRouter.use("/api/services/",require("./services/services.index"))
indexRouter.use("/posts/",require("./viewcontrollers/view.post.controller"));
indexRouter.use("/sitemaps/",require("./viewcontrollers/sitemap.controller"));
app.use(process.env.URL_PREFIX,indexRouter);

const handleCategoryPage= async(req,res)=> {
    let page=1;
    if(req.query.page)
    {
        page=req.query.page;
    }

    const categoryObj= await categoryService.getByIdWithCache(req.params.id);
    //console.log(categoryPosts);
    let categories = await categoryService.getAllWithCache();
    if(!categoryObj)
    {
        header_data={
            'title':"404 - Page not found",
            'description':"Page not available",
            'noindex':true,
            'categories': categories,
        };
        return res.render("404",{header_data:header_data})
    }
    const total_posts = await blogService.getTotalCategoryPostsWithCache(categoryObj._id);
    const categoryPosts= await blogService.getAllCategoryPostsWithCache(categoryObj._id,{"page":page});

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
    res.render("category",{posts:categoryPosts,category:categoryObj,header_data:header_data})

}
const handleHomePage= async(req,res)=> {
    let page=1;
    const posts=await blogService.getAllWithCache({"page":page,"limit":3});
    let categories = await categoryService.getAllWithCache();
    let plugins={}
    let pluginItem={
        'plugin_id':'latest_posts_horizontal',
        'plugin_data':{"posts":posts},
    }
    plugins['latest_posts']=pluginItem
    await Promise.all(categories.map( async(category)=> {
        console.log(category);
        let posts= await blogService.getAllCategoryPostsWithCache(category._id,{"page":page,"limit":3})
        console.log(posts);
        let pluginItem={
            'plugin_id':'category_latest_posts_horizontal',
            'plugin_data':{
                "posts": posts,
                "category": category
            },
        }
        //console.log(pluginItem)
        plugins[category._id+'_latest_posts']=pluginItem
    }))

    console.log(plugins)

    header_data={
        'title':"Home page of Simple Blog tool - Blog Post",
        'description':"It is simplest way to create blogs on net",
        'categories': categories,
        'canonical_url': process.env.HOME_URL,
    };

    res.render("index",{header_data:header_data,plugins:plugins})
}

async function handlePostPage(req,res,next){
    console.log(`id is ${req.params.id}`);
    console.log("device type is "+req.device.type.toUpperCase());
    let is_amp_url= false;
    if(req.query.amp)
    {
        is_amp_url=true;
    }
    let categories = await categoryService.getAllWithCache();
    let post = await blogService.getByIdWithCache(req.params.id);
    if(!post)
    {
        header_data={
            'title':"404 - Page not found",
            'description':"Page not available",
            'noindex':true,
            'categories': categories,
        };
        return res.render("404",{header_data:header_data})
    }

    header_data={
        'title':post.title+" - Blog Post",
        'description':post.description,
        'categories': categories,
        'canonical_url': process.env.HOME_URL+post.url,
        'amp_url':process.env.HOME_URL+post.url+"?amp=1",
        'device_type':req.device.type.toUpperCase(),
    };
    if(!is_amp_url)
    {
        res.render("post",{post:post,header_data:header_data})
    }
    else
    {
        post.content=post.content.replaceAll("<iframe","<amp-iframe sandbox=\"allow-scripts allow-same-origin allow-presentation\" ");
        post.content=post.content.replaceAll("</iframe","</amp-iframe");
        res.render("amp/post",{post:post,header_data:header_data})
    }
}

