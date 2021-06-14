import { Component, OnInit } from '@angular/core';
import { Comment } from '../models/Comment.model';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  model: Comment;

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.commentsService.postComment(this.model).subscribe(
       comment => this.onNext(comment),
       error => console.log(error)
     );
 };

 onNext(comment) {
  this.model = comment;
  console.log('Success Response : ' + comment.body );
  };

}
