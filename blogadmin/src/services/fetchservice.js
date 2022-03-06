import { authService } from "./authservice";
const axios = require("axios")
export default {
   get,
   post
}

async function get(url){
   return await axios.get(url,{
      headers:getAuthHeader(url)
   })
}

async function post(url,params){
    return await axios.post(url,params,{
       headers:getAuthHeader(url)
    });
}

function getAuthHeader(url)
{
   let backendApi=url.startsWith(process.env.REACT_APP_API_URL)
   let loginData=authService.getUser
   console.log(loginData)
   let loggedIn=false;
   if(loginData && loginData.token)
   {
      loggedIn=true;
   }
   if(loggedIn)
   {
      let authHeader= {Authorization:`Bearer ${loginData.token}`}
      console.log("auth header is ")
      console.log(authHeader)
      return authHeader
   }
   else
   {
      console.log("no auth header")
      return {}
   }
}