const crypto=require("crypto")
const jwt = require('jsonwebtoken');
module.exports={
    getPasswordHash,
    generateToken
}

function getPasswordHash(inputStr){
    let salt = process.env.HASH_SALT.toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
     
    let hash = crypto.pbkdf2Sync(inputStr, salt,  
    1000, 64, `sha512`).toString(`hex`); 
    return hash;
}

function generateToken(userId){
    const secret=process.env.SECRET;
    return jwt.sign(userId,secret);
}