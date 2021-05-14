import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ProfilService } from '../services/profil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;
  user_id: string;

  constructor(private profils: ProfilService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user_id = this.auth.getUserId();
    this.route.params.subscribe(
      (params) => {
        this.profils.getProfil(params.id)
        this.user_id = this.auth.getUserId();
      }
    )
  }

}
