import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ProfilService } from '../services/profil.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { User } from '../models/user.model';
import { CommentService } from '../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private post: PostsService,
              private router: Router,
              private comment: CommentService,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private profil: ProfilService) { }

  ngOnInit(): void {
    this.comment.getComments();
    this.loading = true;
    this.postSub = this.post.posts$.subscribe(
      (posts) => {
        console.log(Object.values(posts));
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

    this.id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.profil.getUserById(this.id);

    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id')],
    });
  }

  onModify() {
    this.router.navigate(['messages', this.post]);
  }

  onDelete() {
    let post_id = this.post.getPostById(this.id);
    this.router.navigate(['messages/', post_id]);
    this.post.deletePost(this.id);
    window.location.reload();
  }

  onViewPost() {
    let post_id = this.post.getPostById(this.id);
    this.router.navigate(['messages/', post_id]);
  }

  onAddComment() {
    const content = this.commentForm.get('content').value;
    const user_id = sessionStorage.getItem('user_id');
    const post_id = this.post?.id;
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


