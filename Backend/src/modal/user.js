const mongoose=require("mongoose");

const struct =mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },

    token:String
})
const result=mongoose.model("user_todo",struct)
module.exports=result