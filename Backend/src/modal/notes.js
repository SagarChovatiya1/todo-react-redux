const mongoose=require("mongoose");

const struct =mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    id:{
        type:Number
    },
    completed:{
        type:String
    },
    useref_id:mongoose.Schema.Types.ObjectId
})
const result=mongoose.model("notes_todo",struct)
module.exports=result