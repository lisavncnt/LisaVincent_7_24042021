import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ProfilService } from '../services/profil.service';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post.model';
import { User } from '../models/user.model';
import { CommentService } from '../services/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  comments: Comment[];
  user: User;
  loading: boolean;
  errorMsg: string;
  Post: Post;
  id: string;
  content: string;
  user_id: string;
  post_id: string;

  showComments: boolean = true;

  constructor(private post: PostsService,
              private router: Router,
              private comment: CommentService,
              private formBuilder: FormBuilder,
              private profil: ProfilService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading = true;
    this.postSub = this.post.posts$.subscribe(
      (posts) => {
        this.posts = posts;
        this.loading = false;
        this.errorMsg = null;
        posts.forEach(post => {
          this.commentSub = this.comment.comments$.subscribe(
            (comments) => {
              comments.forEach(comment => {
                if (post.id === comment.post_id) {
                  return comment;
                }
              });
            }
          );
        });
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
      comments: Array
    });

    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user: Array,
    })
  }

  onViewPost(id: string) {
    this.router.navigate(['dashboard/message', id]);
  }

}


