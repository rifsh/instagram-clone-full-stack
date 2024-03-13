import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, PostCommentInterface, PostInterface, PostResponseInterface, ViewCommentsInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';
import { StandardResponseInterface } from 'src/app/model/responseInterrfaace';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: PostCommentInterface[] = [];
  @Input() id: string;;

  posts: ViewpostInterface[] = [];
  userPofilePic: string;
  userName: string;

  constructor(private postSrvc: PostService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      res.datas.filter((x) => { return x._id === this.id }).map((x) => { return this.userPofilePic = x.postedBy.profilePic, this.userName = x.postedBy.username })
    }, (err) => {
      console.log(err);
    })
  }


}
