
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  text: string;
  author: User;
  timestamp: string;
}

export interface Post {
  id: string;
  text: string;
  imageUrl?: string;
  author: User;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}
