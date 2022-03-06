const express=require("express");
const installService = require("./install.service");
const router=express.Router();
router.post("/createadmin",createadmin);
module.exports=router;

async function createadmin(req,res,next){
    console.log("create admin request");
    return await installService.createAdmin()
    .then((user)=>res.send(user))
    .catch(next)
}