import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  url: string;
  user: User;
  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.auth.getToken()) {
      this.router.navigate(['dashboard/', 'messages']);
    } else {
      this.signupForm = this.formBuilder.group({
        pseudo: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [ Validators.required,, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        image_url: [null, Validators.required],

      });
    }
  }

  onSignup() {
    const newUser = new User();
    newUser.pseudo = this.signupForm.get('pseudo').value;
    newUser.email = this.signupForm.get('email').value;
    newUser.password = this.signupForm.get('password').value;

    this.auth.createUser(newUser, this.signupForm.get('image_url').value).then(
      (response) => {
        response;
        this.router.navigate(['auth/signin']);
      }
    ).catch((error) => {
      console.error(error);
      this.errorMsg = error.message;
    })
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.get('image_url').setValue(file);
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
