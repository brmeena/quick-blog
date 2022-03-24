const express = require("express");
const blogService  = require("../resources/blogpost/blogpost.service");
const categoryService  = require("../resources//category/category.service");
const urlutilities= require("../utilities/urlutilities");

const Router= express.Router();
Router.get("/(:title)-i(:id).html",handlePostPage);
module.exports = Router;
async function handlePostPage(req,res,next){
    console.log(`id is ${req.params.id}`);
    let is_amp_url= false;
    if(req.query.amp)
    {
        is_amp_url=true;
    }
    let post = await blogService.getByIdWithCache(req.params.id);
    let categories = await categoryService.getAllWithCache();
    header_data={
        'title':post.title+" - Blog Post",
        'description':post.description,
        'categories': categories,
        'canonical_url': process.env.HOME_URL+post.url,
        'amp_url':process.env.HOME_URL+post.url+"?amp=1",
    };
    if(!is_amp_url)
    {
        res.render("post",{post:post,header_data:header_data})
    }
    else
    {
        res.render("amp/post",{post:post,header_data:header_data})
    }
}