import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfilService } from 'src/app/services/profil.service';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/services/comment.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})

export class SinglePostComponent implements OnInit {

  post: Post;
  loading: boolean;
  errorMsg: string;
  user_id: string;
  commentSub: Subscription;
  is_admin: boolean = false;
  numberOfComment = 0;
  comment_id: string;

  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private profil: ProfilService,
              private comment: CommentService) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.userIsAdmin();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.service.getPostById(params.id).then(
          (post: Post) => {
            this.post = post;
            this.loading = false;
            this.numberOfComment = post.comments.length;
            this.commentSub = this.comment.comments$.subscribe(
              (comments) => {
                comments.forEach(comment => {
                  if(post.id === comment.post_id) {
                    this.comment_id = comment.id;
                    return comment;
                  }
                });
              }
            );
          }
        );
      }
    );
  }

  userIsAdmin() {
    let admin = this.auth.getAdmin();
    if (admin === "true") {
      this.is_admin = true;
    } else {
      this.is_admin = false;
    }
  }

  onBack() {
    this.router.navigate(['dashboard/messages']);
  }

  onModify(id: string) {
    this.router.navigate(['dashboard/edit-message/' + id]);
  }

  onDelete() {
    this.loading = true;
    this.service.deletePost(this.post.id).then(
      (response: { message: string }) => {
        this.loading = false;
        this.router.navigate(['/dashboard/messages'])
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  onModifyComment(id: string) {
    this.router.navigate(['dashboard/message/' + this.post.id + '/edit-comment/' + id]);
  }

  onDeleteComment(id: string) {
    this.loading = true;
    this.comment.deleteComment(id).then(
      (response: { message: string}) => {
        this.loading = false;
        this.router.navigate(['dashboard/messages']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

}
