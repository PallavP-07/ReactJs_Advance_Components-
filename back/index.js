const express=require("express");
const cors=require('cors');
const app=express();
const mongoose=require('mongoose')
const router=require("./router/route")
const bodyparser=require('body-parser');
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json())


mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB connection Sucessfull");
    
}).catch((error)=>{
    console.log(error.message   );
});


app.use(router);
app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})

