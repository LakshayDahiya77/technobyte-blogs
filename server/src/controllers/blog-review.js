import Blog from '../model/blog.js';
import seed from '../seed.js';

seed().then(() => {
    console.log('Seed data loaded.');
});


export const reviewBlog = async (req, res) => {
    const blogId = req.params.id;
    const { reviewStatus, reviewMessage } = req.body;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        //   const user = req.user; 
        //   if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        //   }

        //   if (user.role != 'admin') {
        //     return res.status(403).json({ message: 'Only admins can review blogs' });
        //   }

        let message = '';

        switch (reviewStatus) {
            case 'pending':
                blog.review = 'pending';
                blog.reviewMessage = '';
                message = 'Blog review pending.';
                break;
            case 'approved':
                blog.review = 'approved';
                blog.reviewMessage = '';
                //function call for publishing the blog
                message = 'Blog approved and published for everyone.';
                break;
            case 'update':
                if (!reviewMessage || reviewMessage.trim() === '') {
                    return res.status(400).json({ message: 'Review message is required for update' });
                }
                blog.review = 'update';
                blog.reviewMessage = reviewMessage;
                message = `Blog requires updates. Please review the comments: ${blog.reviewMessage}`;
                break;
            default:
                return res.status(400).json({ message: 'Invalid review status' });
        }

        await blog.save();

        //for updating the blog
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            review: blog.review,
            isPublished: blog.isPublished,
            reviewMessage: blog.reviewMessage
        }, { new: true });

        res.json({ message, updatedBlog });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}