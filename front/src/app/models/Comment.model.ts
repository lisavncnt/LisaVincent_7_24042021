export class Comment {
  id: string;
  user_id: string;
  post_id: string;
  image_id: string;
  content: string;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
}
