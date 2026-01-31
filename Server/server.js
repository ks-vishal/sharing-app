const express=require("express"); 
const connectDB=require("./configs/connection");
const dotenv=require("dotenv");
const cors=require("cors");
const sendMail=require("./services/mailSender")
const filesRouter=require("./routes/fileUploadRoutes.js");
const ExpiryCron=require("./services/cronJob.js");
const downloadRouter=require('./routes/fileDownloadRoutes.js');

const app=express();
dotenv.config();

const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


ExpiryCron();
const port=process.env.PORT||3000;
app.use(cors());
// connection to monogDB
connectDB();

//middleware
app.use(express.json());
// app.use(sanitizeInput);
// app.use(limiter);
// app.use(cors());

//Routes
// app.use('/sid', urlRoutes);


app.get("/", (req,res)=>{
    res.send("Sharing App");
});

let emailOptions={
    emailTo:"siddharth.2727goyal@gmail.com",
    emailFrom:"goyalsiddharth81@gmail.com",
    link: "asdf",
    fileName:"asdf",
    size:12
}

app.use('/',filesRouter);

app.use('/',downloadRouter);
// app.get("/send",(req,res)=>{
//     sendMail()
// })
// error handler(404)
// app.use((req,res,next)=>{
//     res.status(404).json({
//         error:{
//             message: "Route not found"
//         }
//     });
// });

// error handling middleware
// app.use((err,req,res,next)=>{
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//         error:{
//             message: err.message || "Internal server Error"
//         }
//     });
// });

app.listen(port,()=>{
    
    console.log(`Server is running on port ${port}`);
});