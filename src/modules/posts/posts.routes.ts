import { Router } from 'express';
import { 
  createPost, 
  getPosts, 
  updatePost, 
  getPostById, 
  deletePost 
} from './posts.controller';

const PostsRouter = Router();

// TODO: Add authentication middleware
// const authMiddleware = require('../../middleware/auth.middleware');
// const ownerMiddleware = require('../../middleware/owner.middleware');

// POST /api/v1/posts - Create a new post (Auth required)
PostsRouter.post('/', createPost);

// GET /api/v1/posts - List posts with pagination (Public)
PostsRouter.get('/', getPosts);

// GET /api/v1/posts/:id - Get post by ID (Public)
PostsRouter.get('/:id', getPostById);

// PATCH /api/v1/posts/:id - Update post (Auth + Owner required)
PostsRouter.patch('/:id', updatePost);

// DELETE /api/v1/posts/:id - Delete post (soft delete) (Auth + Owner/Admin required)
PostsRouter.delete('/:id', deletePost);

export default PostsRouter;
