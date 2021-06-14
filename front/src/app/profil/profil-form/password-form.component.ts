import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  url: string;
  userForm: FormGroup;
  mode: string;
  loading: boolean;
  user: User;
  errorMsg: string;
  imagePreview: string;
  user_id = sessionStorage.getItem('user_id');

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private profil: ProfilService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
          this.mode = "edit";
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
    this.userForm = this.fb.group({
      password: [null, Validators.required],
    });
    this.imagePreview = this.user.photo;
  };

  onSubmit() {
    this.loading = true;
    const newUser = new User();
    newUser.password = this.userForm.get('password').value;
    this.profil.modifyPassword(this.user.id, this.user.password).then(
      (response: { message: string}) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['/user/' + this.user.id]);
      }
    ).catch(
      (error) => {
        console.error(error);
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }
}
