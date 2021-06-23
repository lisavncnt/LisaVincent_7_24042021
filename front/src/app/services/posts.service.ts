import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts$ = new Subject<Post[]>();
  isloggin = this.auth.isLoggin();
  id = sessionStorage.getItem('post_id');
  user_id = sessionStorage.getItem('user_id')
  user: User;

  constructor(private http: HttpClient,
              private auth: AuthService) {}

  getPosts() {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/dashboard/messages').subscribe(
      (posts: Post[]) => {
        resolve(posts);
        this.posts$.next(posts);
      },
      (error) => {
        reject(error);
        this.posts$.next([]);
        console.error(error);
      });
    });
  }

  getPostById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/dashboard/messages/' + id).subscribe(
        (post: Post) => {
          resolve(post);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createPost(title: string, content: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/messages/add', {
        title: title,
        content:content,
      }).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPost(id: string, post: Post) {
    return new Promise((resolve, reject) => {
        this.http.put('http://localhost:3000/dashboard/edit-message/' + id, post).subscribe(
          (response: {message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('content', post.content);
        formData.append('user_id', this.user_id);
        this.http.put('http://localhost:3000/dashboard/edit-message/' + id, formData).subscribe(
          (response: {message: string}) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  deletePost(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/dashboard/messages/' + id).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
