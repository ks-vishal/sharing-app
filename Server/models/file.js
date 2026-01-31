const mongoose= require("mongoose");

const fileSchema= new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    cloudinaryUrl:{
        type:String,
        required:true,
    },
    fileName:String,
    size:Number,
    expiry:{
        type:Date,
    },
    isExpired:{
        type:Boolean,
        default:false
    },
    createdAt:Date,
    updatedAt:Date
});

module.exports= mongoose.model('File',fileSchema);