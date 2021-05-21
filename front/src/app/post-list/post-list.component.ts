import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postSub: Subscription;
  postForm: FormGroup;
  posts: Post[];
  loading: boolean;
  errorMsg: string;
  Post: Post;

  constructor(private post: PostsService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loading = true;
    this.postSub = this.post.posts$.subscribe(
      (posts) => {
        console.log(Object.values(posts));
        // this.posts = Object.values(posts)[0];
        this.posts = posts;
        console.log(posts);

        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.post.getPosts();

    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      user_id: [null]
    });
  }

  onClickPost(id: string) {
    this.router.navigate(['messages', id]);
  }

}


