import Comment from "../model/comment.js";

export async function CreateComment(req,res){
    const id=req.params.id;
    try {
        Comment.create({
        content:req.body.content,
        user:id
        })
    }catch (error) {
        res.json({message:"Comment creation failed", err:error})
    }
    res.json({message:"Comment created successfully"});
}

