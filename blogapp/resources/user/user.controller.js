const express = require("express");
const userService=require("./user.service");
const Router= express.Router();
const authorize=require("../../services/authentication/authorize");
const Roles = require("../../constants/roles");
Router.get("/:id",getById);
Router.post("/getall",authorize([Roles.ADMIN]),getAll);
Router.post("/create",authorize([Roles.ADMIN]),create);
Router.post("/update/:id",authorize(),update);
module.exports = Router;

async function getById(req,res,next){
    
    userService.getById(req.params.id)
    .then((user)=>{
        res.send(user)
    })
    .catch(next);   
}

async function getAll(req,res,next){
    userService.getAll(req.body)
    .then((users)=>res.send(users))
    .catch(next);
}

async function create(req,res,next){
    userService.create(req.body)
    .then((user)=> res.send(user))
    .catch(next);
}

async function update(req,res,next){
    userService.update(req.params.id,req.body)
    .then((user)=> res.send(user))
    .catch(next);
}
