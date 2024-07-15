import express from 'express'
const router=express.Router()
const {handleSearchBlogs} = require("../controllers/search-blog")

router.get('/', handleSearchBlogs);

export default router;