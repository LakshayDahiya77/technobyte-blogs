import mongoose from "mongoose";
import User from "./user.js";
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    } 
})
const Comment =mongoose.model('Comment',commentSchema);

export default Comment;