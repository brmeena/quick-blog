const { Post } = require("../../database/db.models")

module.exports = {
    getById,
    getAll,
    create,
    update
}

async function getById(blogPostId){
    return await Post.findById(blogPostId);
}

async function getAll(params)
{
    return await Post.find({});
}

async function create(params){
    return await Post.create(params);
}

async function update(blogPostId,params){
    let post=await getById(blogPostId);
    post['title']=params['title'];
    post['content']=params['content'];
    post['description']=params['description'];
    post['updated']=Date.now();
    await post.save();
    return post;
}

