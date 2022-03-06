const Roles= require("../../constants/roles");
const {User} = require("../../database/db.models");
const securityUils= require("../../utilities/securityutils");
const installService= {
    createAdmin,
}

async function createAdmin()
{
    console.log("creating admin")
    let userCount=await User.countDocuments({})
    console.log("current user count is "+userCount);
    if(userCount==0)
    {
        let adminPassword=securityUils.getPasswordHash(process.env.INSTALL_ADMIN_PASSWORD)
        let adminParams={
            'name':'Admin',
            'userid':'admin',
            'passwordhash':adminPassword,
            'role':Roles.ADMIN
        }
        let user= await User.create(adminParams);
        return {
             ...user._doc,
            "adminpassword":process.env.INSTALL_ADMIN_PASSWORD
        };
    }
    throw "Installation already done";
}

module.exports=installService
