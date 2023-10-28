const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt');
const empScema = new mongoose.Schema({
    empId: {
        type: Number,
        required: true
    },
    empName: {
        type: String,
        require: true
    },
    empEmail: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    empMobile: {
        type: Number,
        require: true,
        min: 10
    },
    password: {
        type: String,
        require: true,
        min: 3,
        max: 10
    },
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
});
// empScema.pre('save', async function (next) {
//     console.log("hii from inside");
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });


empScema.methods.generateAuthToken = async function(){
    try{
        let newToken = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:newToken});
        await this.save();
        return newToken;

    }catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("employeeRegister", empScema);