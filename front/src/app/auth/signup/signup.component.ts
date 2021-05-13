import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      pseudo: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSignup() {
    const pseudo = this.signupForm.get('pseudo').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.auth.createUser(pseudo, email, password).then(
      (response : {message: string }) => {
        console.log(response.message);
        
        this.auth.signin(email, password).then(
          () => {
            this.router.navigate(['/dashboard']);
          }
        ).catch(
          (error) => {
            console.error(error);
            this.errorMsg = error.message;
          }
        );
      }
    ).catch((error) => {
      console.error(error);
      this.errorMsg = error.message;
    })
  }

}
