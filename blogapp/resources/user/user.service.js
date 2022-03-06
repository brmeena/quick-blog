const { User } = require("../../database/db.models")
const securityUils= require("../../utilities/securityutils")

module.exports = {
    getById,
    getAll,
    create,
    update
}

async function getById(userId){
    console.log("trying to get user by id"+userId);
    return await User.findById(userId);

}

async function getAll(params)
{
    return await User.find({});
}

async function create(params){
    params['passwordhash']=securityUils.getPasswordHash(params['password']);
    return await User.create(params);
}

async function update(userId,params){
   let user=await getById(userId);
   console.log(params);
   if(params['password'])
        user['passwordhash']=securityUils.getPasswordHash(params['password']);
   user['role']=params['role'];
   user['name']=params['name'];
   console.log(user);
   await user.save();
   return user;
}