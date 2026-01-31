const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
        );
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err.message);
    }
}
module.exports=connectDB;