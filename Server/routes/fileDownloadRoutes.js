const express=require("express");
const router=express.Router();
const File=require('../models/file');

router.get('/download/:shortId', async(req,res)=>{
    try{
        const file=await File.findOne({shortId: req.params.shortId});

        if(!file || file.isExpired || new Date()>new Date(file.expiry)){
            return res.status(404).json({error:'Link expired or file not found'});
        }
        return res.redirect(file.cloudinaryUrl);
    }catch(err){
        console.log(err);
        return res.status(500).json({error:'Internal server error'});
    }
});

module.exports=router;