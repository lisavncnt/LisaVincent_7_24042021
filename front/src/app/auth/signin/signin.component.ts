import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isAuth: boolean;
  errorMsg: string;
  token: string;
  user_id = sessionStorage.getItem('user_id');

  signinForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.auth.getToken()) {
      this.router.navigate(['dashboard/', 'messages']);
    } else {
      this.signinForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      });
    }
  }

  onSignin() {
    this.auth.isAuth$.next(true);
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.auth.signin(email, password).then(
      () => {
        this.token = this.auth.getToken();
        this.user_id;
        this.auth.isAuth$.next(true);
        window.location.reload();
        this.router.navigate(['/dashboard', 'messages']);
      }
    ).catch(
      (error) => {
        this.auth.isAuth$.next(false);
        this.errorMsg = error.message;
      }
    );
  }

}
