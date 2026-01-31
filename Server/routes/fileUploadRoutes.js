const File= require("../models/file.js");
const express = require('express');
const router = express.Router();
const multer= require("multer");
const upload = multer({ dest: 'uploads/' })
const cloudinary= require("../configs/cludinaryConfig.js");
const fs= require("fs");
const { shortenUrl } = require("../services/urlService.js");
const sendMail=require("../services/mailSender.js")


router.post("/upload",upload.single('file'),async(req,res)=>{
    try{
        const {expiry, emailTo}=req.body;
        if(!req.file) return res.status(400).json({error: 'No file uploaded'});
        const result= await cloudinary.uploader.upload(req.file.path,{
            resource_type:'auto',
            timeout: 60000
        });
        fs.unlinkSync(req.file.path);
        const shortId= await shortenUrl(result.url);
        const expiryDate = expiry
            ? new Date(expiry)
            : new Date(Date.now() + 24 * 60 * 60 * 1000); // default: 24 hours
        const createdFile= await File.create({
            shortId,
            cloudinaryUrl:result.url,
            fileName:req.file.originalname,
            size:req.file.size,
            expiry: expiryDate,
            isExpired:false,
        });
        const downloadLink=`https://${req.get("host")}/download/${shortId}`;
        if(emailTo){
            await sendMail({
                emailTo,
                emailFrom: process.env.MAIL_USERNAME,
                link: downloadLink,
                fileName: req.file.originalname,
                size: req.file.size,
            });
        }
        return res.json({
            message: "File uploaded successfully!",
            downloadLink,
            fileDetails: createdFile,
        });

    }
    catch(err){
        console.error("Uplaod error",err);
        return res.status(500).json({ error: "Something went wrong while uploading the file." });
    }

})

module.exports=router;