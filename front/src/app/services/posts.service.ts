import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ProfilService } from './profil.service';
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
              private auth: AuthService,
              private profil: ProfilService) { }

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
      this.http.get('http://localhost:3000/dashboard/message/' + id).subscribe(
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
        user_id: user_id,
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
        this.http.put('http://localhost:3000/dashboard/message/' + id, post).subscribe(
          (response: {message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        this.http.put('http://localhost:3000/dashboard/message/' + id, formData).subscribe(
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
      this.http.delete('http://localhost:3000/dashboard/message' + id).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  likePost(id: string, like: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/message/' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        like: like ? 1 : 0
      })
      .subscribe(
        (like: {message: string}) => {
          resolve(like);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  dislikePost(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/message/' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        like: dislike ? -1 : 0
      })
      .subscribe(
        (dislike: {message: string}) => {
          resolve(dislike);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
