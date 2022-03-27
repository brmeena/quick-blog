const express = require("express");
const blogService = require("./blogpost.service")
let router=express.Router();
const authorize=require("../../services/authentication/authorize");
const Roles = require("../../constants/roles");

router.get("/:id",getById);
router.post("/getall",getAll);
router.post("/create",authorize([Roles.ADMIN,Roles.EDITOR]),create);
router.post("/update/:id",authorize([Roles.ADMIN,Roles.EDITOR]),update);
module.exports = router;

async function getById(req,res,next){
    blogService.getById(req.params.id)
    .then((post)=>{
        res.send(post)
    })
    .catch(next);   
}

async function getAll(req,res,next){
    blogService.getAll(req.body)
    .then((posts)=>res.send(posts))
    .catch(next);
}

async function create(req,res,next){
    blogService.create(req.body)
    .then((post)=> res.send(post))
    .catch(next);
}

async function update(req,res,next){
    blogService.update(req.params.id,req.body)
    .then((post)=> res.send(post))
    .catch(next);
}