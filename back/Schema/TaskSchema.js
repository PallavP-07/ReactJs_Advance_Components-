
const mongoose=require("mongoose");
const taskScema=new mongoose.Schema({
projectName:{
    type:String,
    require:true
},
taskName:{
        type:String,
        require:true
    },
    assignee:{
type:String, 
require:true
    },
    empId:{ 
type:Number,
require:true
    },
    startDate:{
        type:String,
        require:true
    },
    endDate:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    percentage:{
        type:String,
        default:"00"

    },

   status:{
       type:String,
       default:"select"
   }
});
module.exports=mongoose.model("Task",taskScema);
