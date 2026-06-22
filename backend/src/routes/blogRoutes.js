import express from 'express';
import auth from '../middleware/auth.js';
import { createBlog, getAllBlogs, getSingleBlog, getMyBlogs, updateBlog,deleteBlog } from '../controllers/blogController.js';

const blogRouter = express.Router();

blogRouter.post('/newBlog',auth, createBlog);
blogRouter.get('/allblogs',getAllBlogs);
blogRouter.get('/singleblog/:id',getSingleBlog);
blogRouter.get('/myBlogs',auth,getMyBlogs);
blogRouter.post('/updateBlog/:id',auth,updateBlog);
blogRouter.get('/delete/:id',auth,deleteBlog);

export default blogRouter;