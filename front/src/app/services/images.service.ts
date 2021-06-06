import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Img } from '../models/Img.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  images$ = new Subject<Img[]>();
  isloggin = this.auth.isLoggin();

  constructor(private http: HttpClient,
              private auth: AuthService) { }

  getImages() {
    if (this.auth.isAuth$) {
      this.http.get('http://localhost:3000/dashboard/images').subscribe(
      (images: Img[]) => {
        this.images$.next(images);
      },
      (error) => {
        this.images$.next([]);
        console.error(error);
      }
    );
    }
  }

  getImagesById(id: string){
    if (this.auth.isAuth$) {
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
  }

  createImage(image: Img, image_url: File) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      let body = image;
      formData.append('title', body.title);
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

  modifyImage(id: string, image: Img, image_url: string | File) {
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
        formData.append('images', JSON.stringify(image));
        formData.append('image', image_url);
        this.http.put('http:localhost:3000/dashboard/images' + id, formData).subscribe(
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

  likeImage(id:string, like:boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/images/' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        like: like ? 1 : 0
      })
      .subscribe(
        (response: {message: string}) => {
          resolve(like);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  dislikeImage(id: string, dislike: boolean) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/dashboard/images' + id + '/like',
      {
        user_id: sessionStorage.getItem('user_id'),
        like: dislike ? -1 : 0
      })
      .subscribe(
        (response: {message: string}) => {
          resolve(dislike);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
