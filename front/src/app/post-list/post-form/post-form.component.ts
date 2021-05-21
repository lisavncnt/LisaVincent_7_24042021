import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(private formBuilder: FormBuilder,
    private post: PostsService,
    private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null],
      image_url: [null]
    });
  }

  onCreate() {
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
    }
  
    )
  };

}
