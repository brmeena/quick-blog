const { Category } = require("../../database/db.models")

module.exports = {
    getById,
    getAll,
    getAllWithCache,
    create,
    update
}

async function getById(id){
    return await Category.findById(id)
}

async function getAll(params)
{
    return await Category.find({})
}

async function getAllWithCache(params)
{
    return await Category.find({}).cache(300)
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

