import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/Comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ProfilService } from './profil.service';
import { User } from '../models/user.model';
import { Post } from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments$ = new Subject<Comment[]>();
  isloggin = this.auth.isLoggin();
  id = sessionStorage.getItem('user_id');
  user: User;
  post: Post;

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  createComment(comment: Comment) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/comments/add', comment).subscribe(
        (response: { message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getComments() {
    if (this.auth.isAuth$) {
      this.http.get('http://localhost:3000/dashboard/comments').subscribe(
        (comments: Comment[]) => {
          this.comments$.next(comments || []);
        },
        (error) => {
          this.comments$.next([]);
          console.error(error);
        }
      );
    }
  }

  getCommentById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/dashboard/comments/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  modifyComment(id: string, comment: Comment) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/dashboard/comments/' + id, comment).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
      const formData = new FormData();
      formData.append('content', comment.content);
      formData.append('user_id', comment.user.id);
      formData.append('post_id', comment.post.id);
      this.http.put('http://localhost:3000/dashboard/comments/' + id, formData).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  deleteComment(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/dashboard/comments/' + id).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };


}
