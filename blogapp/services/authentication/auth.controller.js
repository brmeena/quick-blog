const express=require("express");
const authService=require("./auth.service")
const router=express.Router();
router.post("/",login);
module.exports=router;

async function login(req,res,next){
    return await authService.authenticate(req.body)
    .then((user)=>res.send(user))
    .catch(next)
}