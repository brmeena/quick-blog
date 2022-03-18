const { Post } = require("../../database/db.models")
const PaginationConfiguration= require("../../constants/paginationconfig");
const urlutilities = require("../../utilities/urlutilities")
module.exports = {
    getTotalPostCountWithCache,
    getById,
    getByIdWithCache,
    getAll,
    getAllWithCache,
    getAllCategoryPostsWithCache,
    getTotalCategoryPostsWithCache,
    create,
    update
}

async function getTotalPostCountWithCache()
{
    return await Post.countDocuments();
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
    let page=parseInt(params['page'])
    let skip_count=PaginationConfiguration.limit*(page-1);
    let posts =await Post.find({}).skip(skip_count).limit(PaginationConfiguration.limit).cache(300)
    return posts.map((p)=> {
        p['url']="/posts/"+urlutilities.getSeoFriendlyName(p.title)+"-i"+p._id+".html"
        return p;
    })
}

async function getTotalCategoryPostsWithCache(categoryId)
{
   return await Post.countDocuments({'category':categoryId}).cache(300);
}

async function getAllCategoryPostsWithCache(categoryId,params)
{
    let page=parseInt(params['page'])
    let skip_count=PaginationConfiguration.limit*(page-1);
    let posts= await Post.find({'category':categoryId}).skip(skip_count).limit(PaginationConfiguration.limit).cache(300)
    return posts.map((p)=> {
        p.url="/posts/"+urlutilities.getSeoFriendlyName(p.title)+"-i"+p._id+".html";
        return p;
    })
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

