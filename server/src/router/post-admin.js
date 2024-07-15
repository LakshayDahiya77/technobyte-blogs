import Blog from "../model/blog.js";

export default async function postAdmin(req, res) {
    // const body = req.body; --> { email, password } ??? 

    try {
        // Published Blogs (where review: approved)
        const published_blogs = await Blog.find({ review: "approved" });
        // Updated Reviews (where review: update)
        const updated_review = await Blog.find({ review: "update" });
        // Pending Reviews (where review: pending)
        const review = await Blog.find({ review: "pending" });

        return res.status(200).json({
            success: true,
            message: "Admin data fetched successfully",
            published_blogs,
            updated_review,
            review,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}