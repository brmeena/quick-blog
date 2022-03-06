const express = require("express");
const blogService  = require("../resources/blogpost/blogpost.service");
const Router= express.Router();
Router.get("/(:title)-i(:id).html",handlePostPage);
module.exports = Router;
async function handlePostPage(req,res,next){
    console.log(`id is ${req.params.id}`);
    let post = await blogService.getById(req.params.id);
    header_data={
        'title':post.title+" - Blog Post",
        'description':post.description
    };
    res.render("post",{post:post,header_data:header_data,process:process})
}