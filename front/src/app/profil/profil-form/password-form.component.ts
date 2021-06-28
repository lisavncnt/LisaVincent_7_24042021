import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'password-form-root',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  form = new FormGroup({
    content: new FormControl(null, Validators.required)
  });
  mode: string;
  loading: boolean;
  user: User;
  errorMsg: string;
  user_id = sessionStorage.getItem('user_id');

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private profil: ProfilService) {

               }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
          this.profil.getUserById(params.id).then(
            (user: User) => {
              this.user = user;
              this.initModifyForm(user.id);
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

  initModifyForm(id: string) {
    this.form = this.fb.group({
      password: ['', Validators.required]
    });
  };

  onSubmit(id: string) {
    this.loading = true;
    const newUser = new User();
    newUser.password = this.form.get('password').value;
    newUser.id = this.user_id;
    this.profil.modifyPassword(this.user_id, newUser)
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
