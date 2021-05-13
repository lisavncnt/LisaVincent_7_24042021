import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;
  private user_id: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(pseudo: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signup', 
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

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.user_id;
  }

  signin(email: string, password) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signin', 
      {email:email, password:password})
      .subscribe(
        (response: {user_id: string, token: string}) => {
          this.user_id = response.user_id;
          this.authToken = response.token;
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
    this.router.navigate(['signin']);
  }
}
