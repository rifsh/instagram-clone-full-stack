import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, userPostsInterface } from 'src/app/model/postResponseInterface';
import { PostViewingComponent } from '../post-viewing/post-viewing.component';
import { PostEditComponent } from '../post-viewing/post-edit/post-edit.component';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent {

  @Input() userIds: string;

  userPosts: userPostsInterface[] = [];

  userId: string = localStorage.getItem('userId');

  constructor(private postSrvc: PostService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      this.userPosts = res.datas.filter((x) => { return x.postedBy._id === this.userIds });

    }, (err) => {
      console.log(err);
    })
  }

  commentAndPostViewing(id: string) {
    this.dialog.open(PostViewingComponent, {
      data: { id: id,editBtn:"userPost" }
    })
  }

  

}
