import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;
  authToken = sessionStorage.getItem('token');
  constructor(private auth: AuthService, private profil: ProfilService) { }
  
  ngOnInit(): void {
    if(this.authToken == undefined) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
  }

  getProfil() {
    this.profil.getProfil;
  }

  onSignout() {
    this.auth.signout;
    sessionStorage.clear();
  }

}
