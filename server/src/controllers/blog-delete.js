import Blog from "../model/blog.js";

const deleteBlogHandler=async(req,res)=>
{
    try
    {
        const blogId=req.params.id;
        const deletedBlog=await Blog.findByIdAndDelete(blogId);
        if(!deletedBlog)
        {
            return res.status(404).json({
                success:false,
                message:"Blog not found",
            });
        }
        res.json({
            success:true,
            message:"Blog deleted successfully",
        });
    }
    catch(error)
    {
        console.error('Error deleting blog:',error);
        res.status(500).json({
            success:false,
            message:"Error deleting Blog",
        });
    }
};