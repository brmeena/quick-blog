import fetchservice from "./fetchservice";
const base_url=process.env.REACT_APP_API_URL;
export const installService= {
    installAdmin,
}

async function installAdmin(){
    return await fetchservice.post(`${base_url}/api/services/install/createadmin`,{});
}
