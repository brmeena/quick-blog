const express = require("express");
const resourceService = require("./category.service")
let router=express.Router();
const authorize=require("../../services/authentication/authorize");

router.get("/:id",getById);
router.post("/getall",getAll);
router.post("/create",authorize(),create);
router.post("/update/:id",authorize(),update);
module.exports = router;

async function getById(req,res,next){
    resourceService.getById(req.params.id)
    .then((resource)=>{
        res.send(resource)
    })
    .catch(next);   
}

async function getAll(req,res,next){
    resourceService.getAll(req.body)
    .then((resources)=>res.send(resources))
    .catch(next);
}

async function create(req,res,next){
    resourceService.create(req.body)
    .then((resource)=> res.send(resource))
    .catch(next);
}

async function update(req,res,next){
    resourceService.update(req.params.id,req.body)
    .then((resource)=> res.send(resource))
    .catch(next);
}