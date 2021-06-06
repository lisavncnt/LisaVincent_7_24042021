export class Post {
    id: string;
    user_id: string;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    usersLiked: string[];
    usersDisliked: string[];
    created_at: Date;
    updated_at: Date;
}
