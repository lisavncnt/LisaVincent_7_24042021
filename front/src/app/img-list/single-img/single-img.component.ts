import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Img } from 'src/app/models/Img.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-single-img',
  templateUrl: './single-img.component.html',
  styleUrls: ['./single-img.component.css']
})
export class SingleImgComponent implements OnInit {

  image: Img;
  loading: boolean;
  errorMsg: string;
  user_id: string;
  commentSub: Subscription;
  is_admin: boolean = false;
  numberOfComment = 0;
  comment_id: string;

  constructor(private service: ImagesService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private comment: CommentService) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.userIsAdmin();
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.service.getImagesById(params.id).then(
          (image: Img) => {
            this.image = image;
            this.numberOfComment = image.comments.length;
            this.loading = false;
            this.commentSub = this.comment.comments$.subscribe(
              (comments) => {
                comments.forEach(comment => {
                  if(image.id === comment.image_id) {
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

  onBack(){
    this.router.navigate(['dashboard/images']);
  }

  onModify(id: string) {
    this.router.navigate(['dashboard/edit-image/' + id]);
  }

  onDelete(id: string) {
    this.loading = true;
    this.service.deleteImage(this.image.id).then(
      (response: {message: string}) => {
        this.loading = false;
        this.router.navigate(['dashboard/images']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  onModifyComment(id: string) {
    this.router.navigate(['dashboard/image/' + this.image.id + '/edit-comment/' + id]);
  }

  onDeleteComment(id: string) {
    this.loading = true;
    this.comment.deleteComment(id).then(
      (response: { message: string}) => {
        this.loading = false;
        this.router.navigate(['dashboard/images']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

}
