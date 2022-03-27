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
    let post= await Post.findById(blogPostId).populate("category").lean()
                .cache(300,"blogpost_"+blogPostId).catch((err)=> {
                    console.log(err);
                    return null;
                })
    if(post)
    {            
        post["url"]="/posts/"+urlutilities.getSeoFriendlyName(post.title)+"-i"+post._id+".html";
    }
    return post;
}


async function getAll(params)
{
    return await Post.find({}).populate("category")
}

async function getAllWithCache(params)
{
    let posts = null;
    if(params)
    {
        let page=parseInt(params['page'])
        let limit =PaginationConfiguration.limit;
        if(params['limit'])
        {
            limit=parseInt(params['limit'])
        }
        let skip_count=limit*(page-1);
        posts =await Post.find({},{"_id":1,"title":1,"description":1,"updated":1}).sort({"updated":-1}).skip(skip_count).limit(limit).cache(300,"blogpostsall_"+skip_count+"_"+limit)
    }
    else{
        posts =await Post.find({},{"_id":1,"title":1,"updated":1}).sort({"updated":-1}).cache(300,"blogpostsall")
    }  
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
    let limit=PaginationConfiguration.limit;
    if(params['limit'])
    {
        limit=parseInt(params['limit']);
    }
    let skip_count=limit*(page-1);
    let posts= await Post.find({'category':categoryId},{"_id":1,"title":1,"description":1,"updated":1}).sort({"updated":-1}).skip(skip_count).limit(limit).cache(300,"blogcategory_"+categoryId+"_"+skip_count+"_"+limit)
    return posts.map((p)=> {
        p.url="/posts/"+urlutilities.getSeoFriendlyName(p.title)+"-i"+p._id+".html";
        return p;
    })
}



async function create(params){
    return await Post.create(params);
}

async function update(blogPostId,params){
    //console.log(params);
    let post=await Post.findById(blogPostId);
    post['title']=params['title'];
    post['content']=params['content'];
    post['category']=params['category'];
    post['description']=params['description'];
    post['updated']=Date.now();
    await post.save();
    return post;
}

