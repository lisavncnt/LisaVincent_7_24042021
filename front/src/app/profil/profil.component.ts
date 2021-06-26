import { Component, Injectable, OnInit } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { User } from '../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {

  selectedFile: ImageSnippet;

  url = '';
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
    this.user_id = sessionStorage.getItem('user_id');
  }

  onBack() {
    this.router.navigate(['dashboard/messages']);
  }

  onModify() {
    this.router.navigate(['modify/user/', this.user_id]);
  }

  onModifyPassword() {
    this.router.navigate(['modify/password/', this.user_id]);
  }

  onDelete() {
    this.loading = true;
    this.profil.deleteUser(this.user_id).then(
      (response) => {
        this.loading = false;
        this.router.navigate(['/dashboard/messages']);
        return response;
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.profil.uploadImage(this.selectedFile.file).subscribe(
        (res) => {

        },
        (err) => {

        })
    });

    reader.readAsDataURL(file);
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        var url = event.target.result;
        return url;
      }
    }
  }

}

