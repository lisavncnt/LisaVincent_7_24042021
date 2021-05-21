import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Img } from '../models/Img.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  user_id = sessionStorage.getItem('user_id');
  images$ = new Subject<Img[]>();

  constructor(private hhtp: HttpClient,
              private auth: AuthService) { }

  getImages() {
    this.hhtp.get('http://localhost:3000/dashboard/images').subscribe(
      (images: Img[]) => {
        this.images$.next(images);
      },
      (error) => {
        this.images$.next([]);
        console.error(error);
      }
    );
  }

  getImagesById(id: string){ 
    return new Promise((resolve, reject) => {
      this.hhtp.get('http://localhost:3000/images/' + id).subscribe(
        (image: Img) => {
          resolve(image);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createImage(title: string, image_url: string, user_id: string) {
    return new Promise((resolve, reject) => {
      this.hhtp.post('http://localhost:3000/dashboard/images/add', {
        title: title, 
        image_url: image_url,
        user_id: this.user_id
      }).subscribe(
        (response: {message:string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
