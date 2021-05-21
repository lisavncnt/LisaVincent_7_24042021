import { Component, Injectable, OnInit } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sauce } from 'protractor/built/driverProviders';

@Injectable() 

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {

  user_id: string;
  user: User;
  likePending: boolean;
  likes: boolean;
  loading: boolean;
  errorMsg: string;
  
  constructor(private profil: ProfilService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.user_id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.profil.getUserById(params.id).then(
          (user: User) => {
            this.user = user;
            this.loading = false;
          }
        );
      }
    );
    this.user_id = this.auth.getUserId();
  }

  onBack() {
    this.router.navigate(['dashboard/messages']);
  }

  onModify() {
    this.router.navigate(['user/:id', this.user_id]);
  }

  onDelete() {
    this.loading = true;
    this.profil.deleteUser(this.user_id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading =false;
        this.router.navigate(['/dashboard/messages'])
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

}

