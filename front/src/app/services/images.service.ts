import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Img } from '../models/Img.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images$ = new Subject<Img[]>();
  isloggin = this.auth.isLoggin();
  id = sessionStorage.getItem('post_id');
  user_id = sessionStorage.getItem('user_id')
  user: User;

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getImages() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/dashboard/images').subscribe(
      (images: Img[]) => {
        resolve(images);
        this.images$.next(images);
      },
      (error) => {
        reject(error);
        this.images$.next([]);
        console.error(error);
      });
    });
  }

  getImagesById(id: string){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/dashboard/images/' + id).subscribe(
        (image: Img) => {
          resolve(image);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createImage(image: Img, image_url: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('title', image.title);
      formData.append('image_url', image_url);
      formData.append('user_id', sessionStorage.getItem('user_id'));
      this.http.post('http://localhost:3000/dashboard/images/add', formData).subscribe(
        (response: { message: string }) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  modifyImage(id: string, image: Img, image_url: File) {
    return new Promise((resolve, reject) => {
      if (typeof image_url === 'string') {
        this.http.put('http://localhost:3000/dashboard/images/' + id, image).subscribe(
          (response: { message:string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        const formData = new FormData();
        formData.append('title', image.title);
        formData.append('image_url', image_url);
        this.http.put('http://localhost:3000/dashboard/images/' + id, formData).subscribe(
          (response: { message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  deleteImage(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/dashboard/images/' + id).subscribe(
        (response: { message: string}) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
