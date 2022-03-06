const { User } = require("../../database/db.models");
const securityUils=require("../../utilities/securityutils")

module.exports={
    authenticate,
}

async function authenticate(params){
    let userid=params["userid"];
    let password=params["password"];
    let user=await User.findOne({'userid':userid})
    if(!user)
    {
        throw "User not found";
    }
    let passwordHash=securityUils.getPasswordHash(password)
    if(passwordHash===user.passwordhash)
    {
        let token=securityUils.generateToken({id:user.userid});
        return {
                ...user._doc,
                token
        };
    }
    throw "User not found"
}