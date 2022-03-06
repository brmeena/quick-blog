const jwt = require("express-jwt")
const db= require("../../database/db.models")
module.exports=authorize   
function authorize(roles=[]){
    if(typeof roles===String)
    {
        roles=[roles]
    }
    return [jwt({secret:process.env.SECRET,algorithms:["HS256"]}),
        async(req,res,next) => {
            //console.log(req.user);
            //console.log(roles);
            const account = await db.User.findOne({userid:req.user.id});
            //console.log(account);
            if(!account || (account.role && !roles.includes(account.role) ))
            {
                console.log("user not authorized");
                return res.status(401).json({"message":"Unauthorized accesss"});
            }
            next();
        }
    ];
}