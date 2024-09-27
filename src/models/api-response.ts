export interface ApiResponse<T> {
  error?: string;
  data: T;
}

export interface UserModel {
  id: string;
  createdAt: string;
  username: string;
  email: string;
}

export interface PostModel {
  id: string;
  content: string;
  createdAt: string;
  user: UserModel;
}

export interface ThreadModel {
  id: string;
  title: string;
  posts: PostModel[];
  createdAt: string;
}

export interface CategoryModel {
  id: string;
  name: string;
  description: string;
  threads: ThreadModel[];
  createdAt: string;
}

export interface SectionModel {
  id: string;
  name: string;
  categories: CategoryModel[];
}
