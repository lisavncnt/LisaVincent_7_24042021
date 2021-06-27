import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  user_id = sessionStorage.getItem('user_id');
  users$ = new Subject<User[]>();

  constructor(private http :HttpClient,) { }

  getUsers() {
    this.http.get('http://localhost:3000/users').subscribe(
      (users: User[]) => {
        this.users$.next(users);
      },
      (error) => {
        this.users$.next([]);
        console.error(error);
      }
    );
  }
  getUserById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/users/'+ id).subscribe(
        (user: User) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUser(id: string, user: User, image: File) {
    return new Promise((resolve, reject) => {
      if (typeof image === 'string') {
        this.http.put('http://localhost:3000/modify-user/' + user.id, user).subscribe(
          (response: {message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('pseudo', user.pseudo);
        formData.append('email', user.email);
        formData.append('image_url', image);
        this.http.put('http://localhost:3000/modify-user/' + id, formData).subscribe(
          (response: { message: string}) => {
            resolve(response);
          },
          (error) => {
            reject(error);
            console.error(error);
          }
        );
      }
    });
  }

  modifyPassword(id: string, user:User) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/modify-password/' + user.id, user).subscribe(
        (response : {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
      const formData = new FormData();
      formData.append('password', user.password);
      formData.append('id', this.user_id);
      this.http.put('http://localhost:3000/modify-password/' + user.id, formData).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  deleteUser(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/users/' + id).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public uploadImage(image_url: File): Observable<any> {
    const formData = new FormData();

    formData.append('image_url', image_url);

   return this.http.post('http://localhost:3000/user', formData);
  }
}



