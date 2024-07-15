import express from 'express';
import { adminMiddleware } from '../middleware/admin.middleware';
import { deleteBlog } from '../controllers/blog-delete';

const router=express.Router();

router.delete('/admin/blog/delete/:id',adminMiddleware,deleteBlog);

export default router;