
import express from 'express';
import Blog from '../model/blog.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { title, content, image, description} = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newBlog = new Blog({
            title,
            content,
            image: image || '',                 // image type to be decided later
            description: description || '',     // description = summary of blog
            review: 'pending',
            reviewMessage: '',
            tags: [],
            comments: [],
            date: Date.now()
        });

        await newBlog.save();

        res.status(201).json({
            message: 'Blog post created successfully',
            blog: newBlog
        });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
});

export default router;