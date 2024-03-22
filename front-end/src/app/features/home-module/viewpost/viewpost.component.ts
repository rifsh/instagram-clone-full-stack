import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, LikesInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';
import { FollowUnfollowListComponent } from 'src/app/shared/follow-unfollow-list/follow-unfollow-list.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostViewingComponent } from 'src/app/shared/post-viewing/post-viewing.component';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  allPosts: ViewpostInterface[] = [];
  Likes: LikesInterface[] = [];
  likesCount: number = 0;

  // liked: boolean = false;  
  userId: string = localStorage.getItem('userId');

  @ViewChild('addCommentForm') commentForm: NgForm;

  constructor(private postSrvc: PostService, private route: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postSrvc.getPost().subscribe({
      next: (res: GetPostInterface) => {
        res.datas.map((x) => { return this.allPosts.push(x) });
        this.allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        // console.log(this.allPosts);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
      }
    })
  }

  likeBtn(id: string, userId: string) {
    this.postSrvc.postLiking(id).subscribe((likeRes: { message: string, like: ViewpostInterface }) => {

      if (likeRes.message) {
        const index = this.allPosts.findIndex((x) => { return x._id === likeRes.like._id });
        if (index !== -1) {
          this.allPosts[index] = likeRes.like;
        }
      }
    }, (err) => {
      console.log(err);
    })

    this.postSrvc.getPostById(id).subscribe((res: GetPostInterface) => {
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

  commentAdding(postId: string) {
    this.postSrvc.addComment(this.commentForm.value.text, postId).subscribe((res: { message: string }) => {
      console.log(res);
      if (res.message === 'Commented') {
        this.commentForm.setValue({
          text: ''
        })
      }

    }, (err) => {
      console.log(err);
    })
  }

  commentAndPostViewing(id: string) {
    this.dialog.open(PostViewingComponent, {
      data: { id: id }
    })
  }
}
