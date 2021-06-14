import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ProfilService } from '../services/profil.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { User } from '../models/user.model';
import { CommentService } from '../services/comment.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postSub: Subscription;
  postForm: FormGroup;
  commentSub: Subscription;
  commentForm: FormGroup;
  posts: Post[];
  user: User;
  loading: boolean;
  errorMsg: string;
  Post: Post;
  id: string;
  content: string;
  user_id: string;
  post_id = (sessionStorage.getItem('post_id'));

  constructor(private post: PostsService,
              private router: Router,
              private comment: CommentService,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private profil: ProfilService) { }

  ngOnInit(): void {
    this.loading = true;
    this.postSub = this.post.posts$.subscribe(
      (posts) => {

        console.log(Object.values(posts));
        this.posts = posts;

        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );

    this.post.getPosts();

    this.id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.profil.getUserById(this.id);

    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id')],
    });
  }

  onModify(id) {
    let post_id = this.post.getPostById(this.post_id);
    this.router.navigate(['message/', id]);
  }

  onDelete() {
    let post_id = this.post.getPostById(this.post_id);
    this.router.navigate(['message/', this.post_id]);
    this.post.deletePost(this.id);
    window.location.reload();
  }

  onViewPost(id: string) {
    this.router.navigate(['messages/', id]);
  }

  onAddComment() {
    const content = this.commentForm.get('content').value;
    const user_id = sessionStorage.getItem('user_id');
    const post_id = this.post_id;
    this.comment.createComment(content, user_id, post_id)
    .then(
      (response: {message: string}) => {
        console.log(response.message);
        window.location.reload();
      }
    ).catch((error) => {
      console.log(error);
      this.errorMsg = error.message;
    })
  }

}


