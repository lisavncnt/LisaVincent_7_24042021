import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProfilService } from 'src/app/services/profil.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})

export class SinglePostComponent implements OnInit {

  post: Post;
  likePending: boolean;
  likes: boolean;
  loading: boolean;
  errorMsg: string;
  user_id: string;

  constructor(private service: PostsService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router,
              private profil: ProfilService) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.loading = true;
    this.route.params.subscribe(
      (params) => {
        this.service.getPostById(params.id).then(
          (post: Post) => {
            this.post = post;
            this.loading = false;
            console.log(post)
          }
        );
      }
    );
    this.user_id = sessionStorage.getItem('user_id');
  }

  onBack() {
    this.router.navigate(['dashboard/messages']);
  }

  onModify(id: string) {
    this.router.navigate(['dashboard/edit-message/' + id]);
  }

  onDelete() {
    this.loading = true;
    this.service.deletePost(this.post.id).then(
      (response: { message: string }) => {
        console.log(response.message);
        this.loading = false;
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
