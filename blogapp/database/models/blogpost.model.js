const mongoose = require("mongoose")
const PostSchema= new mongoose.Schema({
    "title":String,
    "description":String,
    "content":String,
    "category":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
              },
    "updated":{type:Date, default:Date.now},
    "tags":[String]
});

const Post= mongoose.model("Post",PostSchema);

module.exports = Post;