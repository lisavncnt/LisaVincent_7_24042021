import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { Img } from 'src/app/models/Img.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-single-img',
  templateUrl: './single-img.component.html',
  styleUrls: ['./single-img.component.css']
})
export class SingleImgComponent implements OnInit {

  image: Img;
  likePending: boolean;
  likes: boolean;
  loading: boolean;
  errorMsg: string;
  user_id: string;
  user: User;

  constructor(private service: ImagesService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.service.getImagesById(params.id).then(
          (image: Img) => {
            this.image = image;
            console.log(image);
            this.loading = false;
          }
        );
      }
    );
    this.user_id = sessionStorage.getItem('user_id')
  }

  onBack(){
    this.router.navigate(['dashboard/images']);
  }

  onModify(id: string) {
    this.router.navigate(['edit-message', id]);
  }
  onDelete(id: string) {
    this.loading = true;
    this.service.deleteImage(this.image.id).then(
      (response: {message: string}) => {
        console.log(response.message);
        this.loading = false;
        this.router.navigate(['dashboard/images']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
        console.log(error);
      }
    );
  }

}
