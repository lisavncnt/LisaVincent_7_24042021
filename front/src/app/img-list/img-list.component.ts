import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Subscription } from 'rxjs';
import { Img } from '../models/Img.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { User } from '../models/user.model';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {

  imageSub: Subscription;
  commentSub: Subscription;
  commentForm: FormGroup;
  imageForm: FormGroup;
  images: Img[];
  loading: boolean;
  errorMsg: string;
  Image: Img;
  user: User;
  id: string;;
  likes = 0;


  constructor(private image: ImagesService,
              private comment: CommentService,
              private router: Router,
              private formBuilder: FormBuilder,
              private profil: ProfilService) { }

  ngOnInit(): void {
    this.loading = true;
    this.imageSub = this.image.images$.subscribe(
      (images) => {
        console.log(Object.values(images));
        this.images = images;
        this.loading = false;
        this.errorMsg = null;
        images.forEach(image => {
          let image_id = image.id;
          this.commentSub = this.comment.comments$.subscribe(
            (comments) => {
              comments.forEach(comment => {
                if (image_id === comment.image_id) {
                  console.log('image_id: ' + image_id + ' //comment.image_id: ' + comment.image_id);
                }
              })
            }
          )
        })
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.image.getImages();
    this.comment.getComments();

    this.id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.profil.getUserById(this.id);

    this.imageForm = this.formBuilder.group({
      title: [null, Validators.required],
      image_url: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id')],
      comments: [null]

    });

    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user: Array,
    })
  }

  onModify(id: string) {
    this.router.navigate(['dashboard/image', id]);
  }

  onDelete(id: string) {
    this.router.navigate(['dashboard/image', id]);
  }

  onViewImage(id: string) {
    this.router.navigate(['dashboard/image', id]);
  }

  onAddComment(comment) {
    const content = this.commentForm.get('content').value;
    const user_id = sessionStorage.getItem('user_id');
    const image_id = comment.image_id;
    this.comment.createComment(comment)
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
