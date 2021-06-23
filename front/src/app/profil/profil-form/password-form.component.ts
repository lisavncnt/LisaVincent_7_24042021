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
  passwordForm: FormGroup;
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
    this.passwordForm = this.fb.group({
      password: [this.user.password, Validators.required],
    });
  };

  onSubmit() {
    this.loading = true;
    const newUser = new User();
    newUser.password = this.passwordForm.get('password').value;
    if (this.mode === "edit") {
      this.profil.modifyPassword(this.user_id, newUser).then(
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
}
