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
  groupomaniaLogo: any = "../../../assets/logo.png";
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

  onSignout() {
    this.auth.signout;
    sessionStorage.clear();
    window.location.reload();
    this.router.navigate(['auth/', 'signin']);
  }

  getAuth() {
    if (this.authToken) {
      (this.authToken);
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  onClickUser() {
    this.user.getUserById(this.id);
    this.router.navigate(['user', this.id]);
  }

  getPost() {
    this.post.getPosts();
  }

}
