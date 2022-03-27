const { Category } = require("../../database/db.models")
const urlutilties = require("../../utilities/urlutilities")

module.exports = {
    getById,
    getByIdWithCache,
    getAll,
    getAllWithCache,
    create,
    update
}

async function getById(id){
    return await Category.findById(id)
}


async function getByIdWithCache(id){
    return await Category.findById(id).cache(300).catch((err)=> {
        console.log(err);
        return null;
    })
}

async function getAll(params)
{
    return await Category.find({})
}

async function getAllWithCache(params)
{
    let categories= await Category.find({}).cache(300)
    return categories.map((c)=> {
        c.url=getCategoryUrl(c)
        return c
    })
}


async function create(params){
    return await Category.create(params);
}

async function update(id,params){
    let resource=await getById(id);
    resource['title']=params['title'];
    resource['name']=params['name'];
    resource['description']=params['description'];
    resource['updated']=Date.now();
    await resource.save();
    return resource;
}

function getCategoryUrl(category){
    return "/category-"+urlutilties.getSeoFriendlyName(category.name)+"-c"+category._id+".html"
}
