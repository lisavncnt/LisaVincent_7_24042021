import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  token: string = sessionStorage.getItem('token');

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
  }
}
