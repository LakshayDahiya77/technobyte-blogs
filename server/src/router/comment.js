import express from 'express'
import {CreateComment} from "../controllers/comment.js"

const router=express.Router()

//Post Route for creating Comment
router.post("/:id",CreateComment)

export default router;