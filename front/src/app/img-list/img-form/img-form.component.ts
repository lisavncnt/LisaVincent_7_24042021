import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { Img } from '../../models/Img.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-img-form',
  templateUrl: './img-form.component.html',
  styleUrls: ['./img-form.component.css']
})
export class ImgFormComponent implements OnInit {

  url: string;
  imageForm: FormGroup;
  mode: string;
  loading: boolean;
  image: Img;
  errorMsg: string;
  imagePreview: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private images: ImagesService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if(!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.images.getImagesById(params.id).then(
            (image: Img) => {
              this.image = image;
              this.initModifyForm(image);
              this.loading = false;
            }
          ).catch(
            (error) => {
              this.errorMsg = JSON.stringify(error);
            }
          );
        }
      }
    );
  }

  initEmptyForm() {
    this.imageForm = this.formBuilder.group({
      title: [null, Validators.required],
      image_url: [null, Validators.required],
      user_id: null,
    });
  }

  initModifyForm(image: Img) {
    this.imageForm = this.formBuilder.group({
      title: [null, Validators.required],
      image_url: [null, Validators.required],
    });
    this.imagePreview = this.image.image_url;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        var url = event.target.result;
        return url;
      }
    }
  }

  onSubmit() {
    this.loading = true;
    const newImage = new Img();
    newImage.title = this.imageForm.get('title').value;
    newImage.user_id = sessionStorage.getItem('user_id');
    if(this.mode === "new") {
      this.images.createImage(newImage, this.imageForm.get('image_url').value).then(
        (response: { message: string}) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/dashboard/images']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    } else if (this.mode === 'edit') {
      this.images.modifyImage(this.image.id, newImage, this.imageForm.get('image_url').value).then(
        (response: { message: string}) => {
          console.log(response.message);
          this.loading = false;
          this.router.navigate(['/dashboard/images']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      );
    }

  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageForm.get('image_url').setValue(file);
    this.imageForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
