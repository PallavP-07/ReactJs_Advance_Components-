
const mongoose=require("mongoose");
const jwt = require("jsonwebtoken");
// const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    fullname:{
type:String,
required:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
   
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]

})



userSchema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:newToken});
        await this.save();
        return newToken;

    }catch(err){
        console.log(err);
    }
}



module.exports=mongoose.model("SIGNUP",userSchema);












// oMznwkC4XAXIQqPJ