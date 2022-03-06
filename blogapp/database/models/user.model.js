const mongoose = require("mongoose")
const UserSchema= new mongoose.Schema({
    "name":String,
    "userid":{type:String,unique:true},
    "passwordhash":String,
    "updated":{type:Date, default:Date.now},
    "role":String
});

const User= mongoose.model("User",UserSchema);

module.exports = User;