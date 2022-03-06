import resourcetypes from "src/constants/resourcetypes";
import fetchservice from "./fetchservice";
const base_url=process.env.REACT_APP_API_URL;
export default {
   getAll,
   create,
   getById,
   update,
}

function validateResourceType(resourceType){
   switch(resourceType){
      case resourcetypes.BLOG_POST:
         return;
      case resourcetypes.USER:
         return;
   }
   throw "invalid resource type :"+resourceType;
}

async function getAll(resourceType,params)
{
     validateResourceType(resourceType);
     let resources=await fetchservice.post(`${base_url}/api/resources/${resourceType}/getall`,params);
     //console.log("got axios response");
     //console.log(posts.data);
     return resources.data;
}

async function getById(resourceType,id)
{
   validateResourceType(resourceType);
     let resources=await fetchservice.get(`${base_url}/api/resources/${resourceType}/${id}`);
     return resources.data;
}



async function create(resourceType,params){
   validateResourceType(resourceType);
   return await fetchservice.post(`${base_url}/api/resources/${resourceType}/create`,params);
}

async function update(resourceType,postId,params)
{
   validateResourceType(resourceType);
   return await fetchservice.post(`${base_url}/api/resources/${resourceType}/update/${postId}`,params);
}