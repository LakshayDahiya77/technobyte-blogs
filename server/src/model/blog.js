import mongoose from 'mongoose'
import Tag from './tag.js'
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    review: {
        type: String,
        enum: ['pending', 'approved','update'],
        default:'pending'
    },
    reviewMessage:{
        type:String
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
const Blog=mongoose.model('Blog',blogSchema);

export default Blog;