import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

 private profilUrl = 'http://localhost:3000/api/profil/';

  constructor(private http :HttpClient, private auth: AuthService) { }

  getProfil(id: number): Observable<Object> {
    if (this.auth.isAuth == true) {
      const url = `${this.profilUrl}/${id}`;
      return this.http.get(url);
    } else {
      console.log('Cannot get profil id');
    }
  }
  
};


