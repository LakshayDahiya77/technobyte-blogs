import express from 'express';
import { reviewBlog } from '../controllers/blog-review.js';

const router = express.Router();

router.post('/admin/blog/review/:id', reviewBlog);

export default router;