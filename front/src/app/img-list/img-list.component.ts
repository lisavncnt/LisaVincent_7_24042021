import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { Subscription } from 'rxjs';
import { Img } from '../models/Img.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.css']
})
export class ImgListComponent implements OnInit {

  imageSub: Subscription;
  imageForm: FormGroup;
  images: Img[];
  loading: boolean;
  errorMsg: string;
  Image: Img;
  id = sessionStorage.getItem('user_id');


  constructor(private image: ImagesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private user: ProfilService) { }

  ngOnInit(): void {
    this.loading = true;
    this.imageSub = this.image.images$.subscribe(
      (images) => {
        console.log(Object.values(images));
        this.images = images;
        console.log(images);

        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.image.getImages();

    this.imageForm = this.formBuilder.group({
      title: [null, Validators.required],
      image_url: [null, Validators.required],
      user_id: [null]
    });
  }

  onClickImage(id: string) {
    this.router.navigate(['images', id]);
  }

  getUserParams() {
    this.user.getUserById(this.id);
  }

}
