import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Subscription } from 'rxjs';
import { Img } from '../models/Img.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { CommentService } from '../services/comment.service';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {

  imageSub: Subscription;
  imageForm: FormGroup;
  commentSub: Subscription;
  commentForm: FormGroup;
  images: Img[];
  comments: Comment[];
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
        this.images = images;
        this.loading = false;
        this.errorMsg = null;
        images.forEach(image => {
          this.commentSub = this.comment.comments$.subscribe(
            (comments) => {
              comments.forEach(comment => {
                if (image.id === comment.image_id) {
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
    this.image.getImages();

    this.id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.profil.getUserById(this.id);

    this.imageForm = this.formBuilder.group({
      title: [null, Validators.required],
      image_url: [null, Validators.required],
      user_id: [sessionStorage.getItem('user_id')],
      comments: Array

    });

    this.commentForm = this.formBuilder.group({
      content: [null, Validators.required],
      user: Array,
    })
  }

  onViewImage(id: string) {
    this.router.navigate(['dashboard/image', id]);
  }

}
