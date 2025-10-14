import Post from "./models/posts.model";
import User from "../users/models/users.model";
import { Op } from "sequelize";

import { ICreatePost } from "./dtos/CreatePost.dto";
import { IUpdatePost } from "./dtos/UpdatePost.dto";

import { IPostFilter, IPost, IPostWithAuthor, IPaginationMeta, PostStatus } from "./interfaces/posts.interface";

import { IServiceResponse } from "../../types";
import { sequelize } from "../../config/database.config";

export const createPostService = async (payload: ICreatePost): Promise<IServiceResponse<IPost>> => {
  try {
    // Verify user exists
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return {
        message: 'User not found',
        ok: false,
      }
    }

    const post = await Post.create(payload);
  
    return {
      message: 'Post created successfully',
      ok: true,
      data: post.dataValues
    }
  } catch (error) {
    console.error('Error in createPostService:', error);
    return {
      message: 'Error creating post',
      ok: false,
    }
  }
}

export const getPostsService = async (filter: IPostFilter): Promise<IServiceResponse<{ posts: IPostWithAuthor[], meta: IPaginationMeta }>> => {
  try {
    const page = filter.page || 1;
    const limit = Math.min(filter.limit || 10, 50); // Max 50 posts per page
    const offset = (page - 1) * limit;

    const whereConditions: any = {};
    
    // Filter by status (default to ACTIVE if not specified)
    whereConditions.status = filter.status || PostStatus.ACTIVE;
    
    if (filter.userId) {
      whereConditions.userId = filter.userId;
    }

    // Determine sort order
    let orderBy: any[] = [];
    if (filter.sort === 'popular') {
      orderBy = [['totalVotes', 'DESC'], ['createdAt', 'DESC']];
    } else {
      orderBy = [['createdAt', 'DESC']];
    }

    const { count, rows } = await Post.findAndCountAll({
      where: whereConditions,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: orderBy,
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    const meta: IPaginationMeta = {
      page,
      limit,
      total: count,
      totalPages
    };

    return {
      message: 'Posts fetched successfully',
      ok: true,
      data: {
        posts: rows as IPostWithAuthor[],
        meta
      }
    }
  } catch (error) {
    console.error('Error in getPostsService:', error)
    return {
      message: 'Error fetching posts',
      ok: false,
    }
  }
}

export const getPostByIdService = async (id: number): Promise<IServiceResponse<IPostWithAuthor>> => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });
    
    if (!post) {
      return {
        message: 'Post not found',
        ok: false,
      }
    }
    
    return {
      message: 'Post fetched successfully',
      ok: true,
      data: post as IPostWithAuthor,
    }
  } catch (error) {
    console.error('Error in getPostByIdService:', error)
    return {
      message: 'Error fetching post',
      ok: false,
    }
  }
}

export const updatePostService = async (id: number, payload: IUpdatePost, userId: number): Promise<IServiceResponse<number>> => {
  try {
    // First check if post exists and user owns it
    const post = await Post.findByPk(id);
    if (!post) {
      return {
        message: 'Post not found',
        ok: false,
      }
    }

    if (post.userId !== userId) {
      return {
        message: 'Unauthorized: You can only update your own posts',
        ok: false,
      }
    }

    const response = await Post.update(payload, {
      where: {
        id,
        userId // Double check ownership
      }
    });
    
    if (response[0] === 0) {
      return {
        message: 'Post not found or unauthorized',
        ok: false,
      }
    }

    return {
      message: 'Post updated successfully',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error in updatePostService:', error)
    return {
      message: 'Error updating post',
      ok: false,
    }
  }
}

export const deletePostService = async (id: number, userId: number, isAdmin: boolean = false): Promise<IServiceResponse<number>> => {
  try {
    // First check if post exists
    const post = await Post.findByPk(id);
    if (!post) {
      return {
        message: 'Post not found',
        ok: false,
      }
    }

    // Check if user owns the post or is admin
    if (post.userId !== userId && !isAdmin) {
      return {
        message: 'Unauthorized: You can only delete your own posts',
        ok: false,
      }
    }

    // Soft delete by changing status to DELETED
    const response = await Post.update(
      { status: PostStatus.DELETED },
      {
        where: {
          id,
          ...(isAdmin ? {} : { userId }) // Admin can delete any post, users only their own
        }
      }
    );

    if (response[0] === 0) {
      return {
        message: 'Post not found or unauthorized',
        ok: false,
      }
    }

    return {
      message: 'Post deleted successfully',
      ok: true,
      data: response[0],
    }
  } catch (error) {
    console.error('Error in deletePostService:', error)
    return {
      message: 'Error deleting post',
      ok: false,
    }
  }
}
