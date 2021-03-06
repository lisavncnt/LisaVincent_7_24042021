import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'password-form-root',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  form = new FormGroup({
    password: new FormControl()
  });
  mode: string;
  loading: boolean;
  user: User;
  errorMsg: string;
  user_id = sessionStorage.getItem('user_id');

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private profil: ProfilService) {

               }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
          this.profil.getUserById(params.id).then(
            (user: User) => {
              this.user = user;
              this.initModifyForm(user);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
    );
  }

  initModifyForm(user: User) {
    this.form = this.fb.group({
      password: [null, [ Validators.required, , Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  };

  onSubmit(id: string) {
    this.loading = true;
    const newUser = new User();
    newUser.password = this.form.get('password').value;
    this.profil.modifyPassword(id, newUser)
    .then(
      () => {
        this.loading = false;
        this.router.navigate(['/user/' + this.user.id]);
      })
    .catch(
      (error) => {
        console.error(error);
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }
}
