import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  user_id: string;
  post: Post;
  likePending: boolean;
  likes: boolean;
  loading: boolean;
  errorMsg: string;
  post_id = sessionStorage.getItem('post_id');


  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        console.log(params.id);

        this.service.getPostById(this.post_id).then(
          (post: Post) => {
            this.post = post;
            console.log(post);
            this.loading = false;
          }
        );
      }
    );
    this.user_id = sessionStorage.getItem('user_id');
  }

  onBack() {
    this.router.navigate(['dashboard/messages']);
  }

  onModify() {
    this.service.modifyPost(this.post.id, this.post);
    this.router.navigate(['user/:id', this.user_id]);
  }

  onDelete() {
    this.loading = true;
    this.service.deletePost(this.post.id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading =false;
        this.router.navigate(['/dashboard/messages'])
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
        console.error(error);
      }
    );
  }

}
