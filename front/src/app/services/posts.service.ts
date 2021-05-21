import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  user_id = sessionStorage.getItem('user_id');
  posts$ = new Subject<Post[]>();

  constructor(private http: HttpClient,
              private auth: AuthService) { }
  
  getPosts() {
    this.http.get('http://localhost:3000/dashboard/messages').subscribe(
      (posts: Post[]) => {
        this.posts$.next(posts);
      },
      (error) => {
        this.posts$.next([]);
        console.error(error);
      }
    );
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

  createPost(title: string, content: string, user_id: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/messages/add', {
        title: title,
        content:content,
        user_id: this.user_id
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

  modifyPost(id: string, post: Post, image: string | File) {
    return new Promise((resolve, reject) => {
      if(typeof image === 'string') {
        this.http.put('http://localhost:3000/dashboard/messages/' + id, post).subscribe(
          (response: {message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        this.http.put('http://localhost:3000/dashboard/messages/' + id, formData).subscribe(
          (response: {message: string}) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deletePost(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/dashboard/messages' + id).subscribe(
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
