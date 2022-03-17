const { Post } = require("../../database/db.models")

module.exports = {
    getById,
    getByIdWithCache,
    getAll,
    getAllWithCache,
    create,
    update
}

async function getById(blogPostId){
    return await Post.findById(blogPostId).populate("category")
}

async function getByIdWithCache(blogPostId){
    return await Post.findById(blogPostId).populate("category").lean()
                .cache(300)
}


async function getAll(params)
{
    return await Post.find({}).populate("category")
}

async function getAllWithCache(params)
{
    return await Post.find({}).cache(300)
}



async function create(params){
    return await Post.create(params);
}

async function update(blogPostId,params){
    console.log(params);
    let post=await Post.findById(blogPostId);
    post['title']=params['title'];
    post['content']=params['content'];
    post['category']=params['category'];
    post['description']=params['description'];
    post['updated']=Date.now();
    await post.save();
    return post;
}

