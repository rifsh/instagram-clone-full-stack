import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, LikesInterface, PostInterface, ViewCommentsInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';
import { PostViewingComponent } from 'src/app/shared/post-viewing/post-viewing.component';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  allPosts: ViewpostInterface[] = [];
  Likes: LikesInterface[] = [];

  liked: boolean = false;

  @ViewChild('addCommentForm') commentForm: NgForm

  constructor(private postSrvc: PostService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      res.datas.map((x) => { return this.allPosts.push(x) });
      // console.log(this.allPosts.map((x) => { x.likes.includes(this.userId) }));
    }, (err) => {
      console.log(err);
    });
  }

  likeBtn(id: string, userId: string) {
    this.postSrvc.postLiking(id).subscribe((res: PostInterface) => {
    }, (err) => {
      console.log(err);
    })
    this.postSrvc.getPostById(id).subscribe((res: GetPostInterface) => {
      // console.log(res.datas);
    }, (err) => {
      console.log(err);
    })

  }

  otherProfile(id: string) {
    if (localStorage.getItem('userId') === id) {
      this.route.navigate(['profile'])
    } else {
      this.route.navigate([`other-user-profile/${id}`]);
    }
  }

  commentAdding(postId:string) {
    this.postSrvc.addComment(this.commentForm.value.text,postId).subscribe((res:{message:string})=>{
      console.log(res);
      if (res.message === 'Commented') {
        this.commentForm.setValue({
          text: ''
        })
      }

    },(err)=>{
      console.log(err);
    })
  }

  commentAndPostViewing(id: string) {
    this.dialog.open(PostViewingComponent, {
      data: { id: id }
    })
  }


}
