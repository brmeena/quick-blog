import fetchservice from "./fetchservice"
import { BehaviorSubject } from "rxjs";
const base_url=process.env.REACT_APP_API_URL;

const userSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem("user"))
);
export const authService =  {
    authenticate,
    logout,
    get getUser(){
        return userSubject.value;
    }
}

async function authenticate(userid,password){
    let userData= await fetchservice.post(`${base_url}/api/services/login/`,{userid,password});
    if(userData)
    {
        console.log("setting local storage")
        localStorage.setItem("user",JSON.stringify(userData.data));
        userSubject.next(userData.data);
        console.log(userSubject.value);
    } 
    else{
        console.log("null userData");
    }
    return userData;
}

async function logout(){
    localStorage.removeItem("user");
    userSubject.next(null);
}