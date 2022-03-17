const express = require("express");
const blogService  = require("../resources/blogpost/blogpost.service");
const categoryService  = require("../resources//category/category.service");

const Router= express.Router();
Router.get("/(:title)-i(:id).html",handlePostPage);
module.exports = Router;
async function handlePostPage(req,res,next){
    console.log(`id is ${req.params.id}`);
    let post = await blogService.getByIdWithCache(req.params.id);
    let categories = await categoryService.getAllWithCache();
    header_data={
        'title':post.title+" - Blog Post",
        'description':post.description,
        'categories': categories,
    };
    res.render("post",{post:post,header_data:header_data,process:process})
}