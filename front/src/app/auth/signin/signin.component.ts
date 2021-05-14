import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  isAuth: boolean;
  errorMsg: string;
  token: string;
  user_id: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSignin() {
    this.auth.isAuth = true;
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.auth.signin(email, password).then(
      () => {
        this.token = this.auth.getToken();
        this.user_id = this.auth.getUserId();
        this.auth.isAuth = true;
        this.router.navigate(['/dashboard']);
      }
    ).catch(
      (error) => {
        this.auth.isAuth = false;
        this.errorMsg = error.message;
      }
    );
  }

}
