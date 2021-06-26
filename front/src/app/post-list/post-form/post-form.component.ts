import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfilService } from 'src/app/services/profil.service';
import { Post } from 'src/app/models/Post.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  user: User;
  user_id: string;
  mode: string;
  post: Post;

  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    public router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private profil: ProfilService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          this.mode = 'new';
          this.initEmptyForm();
          this.loading = false;
        } else {
          this.mode = 'edit';
          this.postService.getPostById(params.id).then(
            (post: Post) => {
              this.post = post;
              this.initModifyForm(post);
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
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: post.title,
      content: post.content,
    })
  }

  onSubmit() {
    this.loading = true;
    const newPost = new Post();
    newPost.title = this.postForm.get('title').value;
    newPost.content = this.postForm.get('content').value;
    newPost.user_id = this.user_id;
    if(this.mode === 'new') {
      this.postService.createPost(newPost.title, newPost.content).then(
        (response: {message: string}) => {
          this.loading = false;
          this.router.navigate(['/dashboard/messages']);
        }
      ).catch(
        (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = error.message;
        }
      )
    } else if (this.mode === 'edit') {
      this.postService.modifyPost(this.post.id, newPost).then(
        (response: { message: string}) => {
          this.loading = false;
          this.router.navigate(['/dashboard/messages']);
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

  showTitle() {
    if (this.router.url.includes('messages/add')) {
      return true;
    } else {
      return false;
    }
  }

}
