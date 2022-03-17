const express=require("express");
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const authorize = require("../authentication/authorize")
const router=express.Router();
aws.config.update({
    accessKeyId: process.env.S3AccessKey,
    secretAccessKey: process.env.S3AccessSecret
});

var s3 = new aws.S3()
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3UploadBucket,
        cacheControl: 'max-age=31536000',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log(file)
            let fileName=Date.now().toString()+"_"+file.originalname.replaceAll(" ","_").toLowerCase()
            console.log(fileName);
            cb(null, fileName)
        }
    })
})
router.post("/image",upload.single("file"),imageUpload);
module.exports=router;

async function imageUpload(req,res,next){
    //console.log(req.files);
    return res.send({"location":"https://kj-blog-media.s3.ap-south-1.amazonaws.com/"+req.file.key})
}