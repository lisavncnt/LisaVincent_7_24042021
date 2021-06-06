import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  user: User;
  user_id: string;

  constructor(private formBuilder: FormBuilder,
    private post: PostsService,
    private router: Router,
    private auth: AuthService,
    private profil: ProfilService) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    // this.user?.pseudo;
    // let image = this.user?.image_url;
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      user_id: [null],
      pseudo: [null],
      // image: [image, Validators.required]
    });
    this.loading = false;
  }

  onSubmit() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const user_id = sessionStorage.getItem('user_id');

    this.post.createPost(title, content, user_id).then(
      (response : {message: string }) => {
        console.log(response.message);
        this.router.navigate(['dashboard/messages']);
      }
    ).catch((error) => {
      console.error(error);
      this.errorMsg = error.message;
    })
  };

  onDelete() {
    if (sessionStorage.getItem('token') === this.auth.getToken()) {
      this.post.deletePost;
      this.router.navigate(['dashboard/messages']);
    }
  }

}
