import express from "express";
import Blog from "./model/blog.js";

const router = express.Router();

// Handle POST request to create a new blog entry
router.post('/create', async (req, res) => {
    const { title, content, image, description } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required!' });
    }
    if (!content) {
        return res.status(400).json({ message: 'Content is required!' });
    }
    

    try {
        // Create a new blog instance using the Blog schema
        const newBlog = new Blog({ title, content, image:image || "", description:description||"",
            review:"pending", reviewMessage:"", tags:[], comments:[], date: Date.now()}); //image to be decided later

        // Save the new blog entry to MongoDB
        const savedBlog = await newBlog.save();
        console.log('Blog saved successfully:', savedBlog);
        res.status(201).json({ success: true, message: 'Blog created successfully!', blog: savedBlog });
    } 
    catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ success: false, message: 'Error creating blog.', error: error.message });
    }
});
export default router;