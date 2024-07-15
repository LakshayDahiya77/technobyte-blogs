const Blog = require("../model/blog");

async function handleBlogSearch(req, res) {

    const { tags, time, query } = req.query;
    
    try {
        const requiredBlogs = await Blog.find({});

        if (tags) {
            const taglist = tags.split(",");
            requiredBlogs = requiredBlogs.filter(blog =>
                taglist.every(tag => blog.tags.includes(tag))
            );
        }
    
        if (time) {
            requiredBlogs = requiredBlogs.filter(blog =>
                blog.date === time
            );
        }

        if (query) {
            requiredBlogs = requiredBlogs.filter(blog =>
                blog.content.tolowercase().includes(query.tolowercase()) ||
                blog.title.tolowercase().includes(query.tolowercase())
            );
        }
        
        res.json(requiredBlogs);
    }

    catch (error) {
        res.json("Failed to Search blogs based on given params",error);
    }  
}

module.exports = {
    handleBlogSearch,
}