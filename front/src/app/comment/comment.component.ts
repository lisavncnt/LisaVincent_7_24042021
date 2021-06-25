import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user.model';
import { Post } from '../models/Post.model';
import { Comment } from '../models/Comment.model';

import { CommentService } from '../services/comment.service';
import { PostsService } from '../services/posts.service';
import { ProfilService } from '../services/profil.service';
import { AuthService } from '../services/auth.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  loading: boolean;
  errorMsg: string;

  commentForm = new FormGroup({
    content: new FormControl(),
  });
  user: User;
  user_id: string;
  post: Post;
  post_id: string;
  mode: string;
  comment: Comment;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private servComment: CommentService,
              private servPost: PostsService) {}

  ngOnInit(): void {
    this.loading  = true;
    this.route.params.subscribe(
      (params) => {
        this.servPost.getPostById(params.id).then(
          (post: Post) => {
            this.post = post;
            this.post_id = post.id;
            this.mode = 'new';
            this.initEmptyForm();
            this.loading = false;
          }
        ).catch(
          (error) => {
            this.errorMsg = error.message;
          }
        );
      }
    );
  };

  initEmptyForm() {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id'), Validators.required],
      post_id: [this.post_id, Validators.required]
    });
  };

  initModifyForm(comment: Comment) {
    this.commentForm = this.formBuilder.group({
      content: comment.content,
      user_id: this.user_id,
    })
  };

  onSubmit() {
    this.loading = true;
    const newComment = new Comment();
    newComment.content = this.commentForm.get('content').value;
    newComment.user_id = sessionStorage.getItem('user_id');
    newComment.post_id = this.post.id;
    if (this.mode === 'new') {
      this.servComment.createComment(newComment).then(
        (response: {message: string}) => {
          this.loading = false;
          this.router.navigate(['dashboard/messages' + this.post.id]);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      )
    } else if (this.mode === 'edit') {
      this.servComment.modifyComment(newComment.id, newComment).then(
        (response: { message: string}) => {
          this.loading = false;
          window.location.reload();
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      )
    }
  };

}
