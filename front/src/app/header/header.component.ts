import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  id = sessionStorage.getItem('user_id');
  authToken = sessionStorage.getItem('token');
  constructor(private auth: AuthService, 
              private router: Router,
              private user: ProfilService,
              private post: PostsService) { }
  
  ngOnInit(): void {
    this.getAuth();
  }

  getProfil() {
    // this.profil.getProfil;
  }

  onSignout() {
    this.auth.signout;
    sessionStorage.clear();
  }
  
  getAuth() {
    if (this.authToken) {
      console.log(this.authToken);
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  onClickUser(id: string) {
    this.user.getUserById(this.id);
    this.router.navigate(['user', this.id]);
  }

  getPost() {
    this.post.getPosts();
  }

}
