import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, PostCommentInterface, PostInterface, PostResponseInterface, ViewCommentsInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';
import { PostEditComponent } from './post-edit/post-edit.component';

@Component({
  selector: 'app-post-viewing',
  templateUrl: './post-viewing.component.html',
  styleUrls: ['./post-viewing.component.css']
})
export class PostViewingComponent implements OnInit {
  @Input() id: string;
  postPic: string;
  userPofilePic: string;
  userName: string;
  allComments: PostCommentInterface[] = [];

  @ViewChild('addCommentForm') commentForm: NgForm;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private postSrvc: PostService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.postSrvc.getPostById(this.data.id).subscribe((res: PostResponseInterface) => {
      this.postPic = res.datas.image;
    }, (err) => {
      console.log(err);
    })
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      res.datas.filter((x) => { return x._id === this.data.id }).map((x) => { return this.userPofilePic = x.postedBy.profilePic, this.userName = x.postedBy.username })
    }, (err) => {
      console.log(err);
    })

    this.postSrvc.viewComments(this.data.id).subscribe((res: ViewCommentsInterface) => {
      res.datas.map((x) => { this.allComments.push(x) });

    }, (err) => {
      console.log(err);

    })
  }

  commentAdding() {
    this.postSrvc.addComment(this.commentForm.value.text, this.data.id).subscribe((res: { message: string }) => {
      if (res.message === 'Commented') {
        this.commentForm.setValue({
          text: ''
        })
      }

    }, (err) => {
      console.log(err);
    })
  }

  postEdit() {
    this.dialog.open(PostEditComponent, {
      data:{postId: this.data.id}
    })
  }

}
