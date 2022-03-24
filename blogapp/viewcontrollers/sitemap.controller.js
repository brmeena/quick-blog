const express = require("express");
const blogService  = require("../resources/blogpost/blogpost.service");
const categoryService  = require("../resources//category/category.service");
const urlutilities= require("../utilities/urlutilities");

const Router= express.Router();
Router.get("/sitemap.xml",handleSitemapXml);
module.exports = Router;

async function handleSitemapXml(req,res,next){
    let categories=  await categoryService.getAllWithCache();
    let posts = await blogService.getAllWithCache();
    console.log(categories);
    res.render("sitemaps/sitemap",{categories:categories,posts:posts,process:process})
}
