const mongoose = require("mongoose")
const CategorySchema= new mongoose.Schema({
    "title":{type:String,required:true},
    "description":{type:String,required:true},
    "name":{type:String,required:true},
    "updated":{type:Date, default:Date.now},
});

const Category= mongoose.model("Category",CategorySchema);

module.exports = Category;