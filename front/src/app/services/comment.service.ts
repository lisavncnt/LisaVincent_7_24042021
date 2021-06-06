import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
    private auth: AuthService,
    private profil: ProfilService) { }

    createComment(content:string, user_id: string, post_id: string) {
      if (this.auth.isAuth$) {
        return new Promise((resolve, reject) => {
          this.http.post('http://localhost:3000/dashboard/comments', {
          content: content,
          user_id: this.user.id,
          post_id: this.post.id,
        }).subscribe(
          (response: {message: string}) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        )
        });
      }
    }

    getComments() {
      if (this.auth.isAuth$) {
        this.http.get('http://localhost:3000/dashboard/comments').subscribe(
        (comments: Comment[]) => {
          this.comments$.next(comments);
        },
        (error) => {
          this.comments$.next([]);
          console.error(error);
        }
      );
      }
    }

}
