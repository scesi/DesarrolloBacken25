export enum PostStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  FLAGGED = 'FLAGGED'
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  userId: number;
  totalVotes: number;
  status: PostStatus;
}

export interface IPostWithAuthor extends IPost {
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface IPostFilter {
  status?: PostStatus;
  userId?: number;
  sort?: 'recent' | 'popular';
  page?: number;
  limit?: number;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
