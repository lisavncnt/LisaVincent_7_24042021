import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url = 'http://localhost:3000/dashboard/comments';


  constructor(private http: HttpClient) { }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }

  getAllComments() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe(
        (comments) => {
          resolve(comments);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyComment(id: string) {
    return new Promise((resolve, reject) => {
      this.http.put(this.url, id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteComment(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.url).subscribe(
        (response) => {
          resolve(response);
        },(error) => {
          reject(error);
        }
      );
    });
  }
}
