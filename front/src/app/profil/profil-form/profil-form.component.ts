import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilService } from 'src/app/services/profil.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil-form',
  templateUrl: './profil-form.component.html',
  styleUrls: ['./profil-form.component.css']
})
export class ProfilFormComponent implements OnInit {

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
        if(!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
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
      }
    );
  }

  initEmptyForm() {
    this.userForm = this.fb.group({
      pseudo: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      image_url: [null, Validators.required],
    });
  };

  initModifyForm(user: User) {
    this.userForm = this.fb.group({
      pseudo: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      image_url: [null, Validators.required],
    });
    this.imagePreview = this.user.image_url;
  };

  onSelectFile(event) {
    if (event.targer.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        var url = event.target.result;
        return url;
      }
    }
  };

  onSubmit() {
    this.loading = true;
    const newUser = new User();
    newUser.pseudo = this.userForm.get('pseudo').value;
    newUser.email = this.userForm.get('email').value;
    newUser.password = this.userForm.get('password').value;

      this.profil.modifyUser(this.user.id, this.user ,this.userForm.get('image_url').value).then(
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

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.get('image_url').setValue(file);
    this.userForm.updateValueAndValidity;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
