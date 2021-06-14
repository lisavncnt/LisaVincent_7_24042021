import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { ProfilService } from './profil.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);

  private authToken: string;
  user_id: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(pseudo: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/auth/signup',
      {pseudo: pseudo, email: email, password: password})
      .subscribe(
        (response: {message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyUser(user: User, photo: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      let body = user;
      formData.append('pseudo', body.pseudo);
      formData.append('email', body.email);
      formData.append('password', body.password);
      formData.append('photo', photo);
      this.http.post('http;//localhost:3000/auth/signup', formData).subscribe(
        (response: {message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getToken() {
    let token = sessionStorage.getItem('token');
    return token;
  }

  getUserId(id: string) {
    this.user_id = sessionStorage.getItem('user_id');
    return this.user_id;
  }

  isLoggin() {
    let token = sessionStorage.getItem('token');
    if (typeof token === 'string' && token.length > 0) {
      this.isAuth$.next(true);
    }
  }

  signin(email: string, password) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/auth/signin',
      {email:email, password:password})
      .subscribe(
        (response: {user_id: string, token: string}) => {
          this.user_id = response.user_id;
          sessionStorage.setItem('user_id', response.user_id);
          this.authToken = response.token;
          sessionStorage.setItem('token', response.token);
          this.isAuth$.next(true);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signout() {
    this.authToken = null;
    this.user_id = null;
    this.isAuth$.next(false);
    window.location.reload();
    this.router.navigate(['/auth', 'signin']);
  }

}


