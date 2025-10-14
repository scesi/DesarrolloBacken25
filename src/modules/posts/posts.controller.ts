import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from "./posts.service";
import { IPostFilter, PostStatus } from "./interfaces/posts.interface";

// TODO: Add proper authentication middleware
// For now, we'll extract userId from request (assuming it's added by auth middleware)
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;

    // Basic validations
    if (!data.title || !data.content) {
      res.status(400).send({
        message: 'Missing required fields: title, content',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate title length
    if (data.title.length > 255) {
      res.status(400).send({
        message: 'Title must be 255 characters or less',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate content length
    if (data.content.length > 10000) {
      res.status(400).send({
        message: 'Content must be 10,000 characters or less',
        status: 400,
        ok: false,
      });
      return;
    }

    // TODO: Get userId from authenticated user (from JWT token)
    // For now, we'll use a placeholder or extract from request
    const userId = req.user?.id || data.userId; // Fallback for testing
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await createPostService({
      title: data.title,
      content: data.content,
      userId
    });

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(201).send({
      message: result.message,
      status: 201,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in createPost:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    
    // Safe validation and sanitization
    const filter: IPostFilter = {};
    
    // Validate status
    if (query.status && typeof query.status === 'string') {
      if (Object.values(PostStatus).includes(query.status as PostStatus)) {
        filter.status = query.status as PostStatus;
      }
    }
    
    // Validate userId
    if (query.userId && typeof query.userId === 'string') {
      const userId = Number(query.userId);
      if (!isNaN(userId) && userId > 0) {
        filter.userId = userId;
      }
    }
    
    // Validate sort
    if (query.sort && typeof query.sort === 'string') {
      if (query.sort === 'recent' || query.sort === 'popular') {
        filter.sort = query.sort;
      }
    }
    
    // Validate pagination
    if (query.page && typeof query.page === 'string') {
      const page = Number(query.page);
      if (!isNaN(page) && page > 0) {
        filter.page = page;
      }
    }
    
    if (query.limit && typeof query.limit === 'string') {
      const limit = Number(query.limit);
      if (!isNaN(limit) && limit > 0 && limit <= 50) {
        filter.limit = limit;
      }
    }

    const result = await getPostsService(filter);

    if (!result.ok) {
      res.status(400).send({
        message: result.message,
        status: 400,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getPosts:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid post id',
        status: 400,
        ok: false,
      });
      return;
    }
    
    const result = await getPostByIdService(numericId);

    if (!result.ok) {
      res.status(404).send({
        message: result.message,
        status: 404,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in getPostById:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const data = req.body;
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid post id',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate title length if provided
    if (data.title && data.title.length > 255) {
      res.status(400).send({
        message: 'Title must be 255 characters or less',
        status: 400,
        ok: false,
      });
      return;
    }

    // Validate content length if provided
    if (data.content && data.content.length > 10000) {
      res.status(400).send({
        message: 'Content must be 10,000 characters or less',
        status: 400,
        ok: false,
      });
      return;
    }

    // TODO: Get userId from authenticated user
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await updatePostService(numericId, data, userId);

    if (!result.ok) {
      const statusCode = result.message.includes('Unauthorized') ? 403 : 400;
      res.status(statusCode).send({
        message: result.message,
        status: statusCode,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in updatePost:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.params.id;
    
    // Validate id
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      res.status(400).send({
        message: 'Invalid post id',
        status: 400,
        ok: false,
      });
      return;
    }

    // TODO: Get userId and role from authenticated user
    const userId = req.user?.id;
    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'super_admin';
    
    if (!userId) {
      res.status(401).send({
        message: 'Authentication required',
        status: 401,
        ok: false,
      });
      return;
    }

    const result = await deletePostService(numericId, userId, isAdmin);

    if (!result.ok) {
      const statusCode = result.message.includes('Unauthorized') ? 403 : 404;
      res.status(statusCode).send({
        message: result.message,
        status: statusCode,
        ok: false,
      });
      return;
    }

    res.status(200).send({
      message: result.message,
      status: 200,
      ok: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).send({
      message: 'Internal server error',
      status: 500,
      ok: false,
    });
  }
}
