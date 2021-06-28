import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user.model';
import { Post } from '../models/Post.model';
import { Img } from '../models/Img.model';
import { Comment } from '../models/Comment.model';

import { CommentService } from '../services/comment.service';
import { PostsService } from '../services/posts.service';
import { ProfilService } from '../services/profil.service';
import { AuthService } from '../services/auth.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImagesService } from '../services/images.service';

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
  image: Img;
  image_id: string;
  comment_id: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private servComment: CommentService,
              private servPost: PostsService,
              private profil: ProfilService,
              private servImage: ImagesService) {}

ngOnInit(): void {
  this.loading  = true;
  if (this.router.url.includes('message')) {
      this.route.params.subscribe(
        (params) => {
          if (this.router.url.includes('comments/add')) {
            this.mode = 'new';
            this.servPost.getPostById(params.id).then(
              (post: Post) => {
                this.post = post;
                this.post_id = post.id;
              }
            )
            this.initEmptyForm();
            this.loading = false;
          } else {
            this.mode = 'edit';
            this.servComment.getCommentById(params.id).then(
              (comment: Comment) => {
                (comment);
                this.comment = comment;
                this.comment_id = comment.id;
                this.initModifyForm(comment);
                this.loading = false;
              }
            ).catch(
              (error) => {
                this.errorMsg = error;
              }
            );
          }
        }
      );
    } else if (this.router.url.includes('image')) {
      this.route.params.subscribe(
        (params) => {
        if (this.router.url.includes('comments/add')) {
          this.mode = 'new';
          this.servImage.getImagesById(params.id).then(
            (image: Img) => {
              this.image = image;
              this.image_id = image.id
            }
          );
          this.initEmptyForm();
          this.loading = false;
        } else {
            this.mode = 'edit';
            this.servComment.getCommentById(params.id).then(
              (comment: Comment) => {
                this.comment = comment;
                this.comment_id = comment.id;
                this.initModifyForm(comment);
                this.loading = false;
              }
            ).catch(
              (error) => {
                this.errorMsg = error;
              }
            );
          }
        }
      );
    }
  };

  initEmptyForm() {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id'), Validators.required],
      post_id: this.post_id,
      image_id: this.image_id,
      user: this.profil.getUserById(this.user_id)
    });
  };

  initModifyForm(comment: Comment) {
    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id'), Validators.required],
      post_id: this.post_id,
      image_id: this.image_id,
      user: this.profil.getUserById(this.user_id)
    })
  };

  onSubmit() {
    this.loading = true;
    const newComment = new Comment();
    newComment.content = this.commentForm.get('content').value;
    newComment.user_id = sessionStorage.getItem('user_id');
    newComment.post_id = this.post?.id;
    newComment.image_id = this.image?.id;
    if (this.mode === 'new') {
      this.servComment.createComment(newComment).then(
        (response: {message: string}) => {
          this.loading = false;
            if (this.router.url.includes('message')) {
            this.router.navigate(['dashboard/message' + this.post.id]);
          } else if (this.router.url.includes('image')) {
            this.router.navigate(['dashboard/image' + this.image.id]);
          }
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      )
    } else if (this.mode === 'edit') {
      this.servComment.modifyComment(this.comment_id, newComment).then(
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

  showTitle() {
    if (this.router.url.includes('add')) {
      return true;
    } else {
      return false;
    }
  };

}
