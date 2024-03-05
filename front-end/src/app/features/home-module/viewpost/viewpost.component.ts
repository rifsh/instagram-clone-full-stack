import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, PostInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  allPosts: ViewpostInterface[] = [];

  liked: boolean = false;


  constructor(private postSrvc: PostService, private route: Router) { }

  ngOnInit(): void {
    const userId: string = localStorage.getItem('userId');
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      res.datas.map((x) => { return this.allPosts.push(x) });
    }, (err) => {
      console.log(err);
    })

  }

  likeBtn(id: string, userId: string) {
    this.postSrvc.postLiking(id).subscribe((res: PostInterface) => {
      // console.log(res);

    }, (err) => {
      console.log(err);
    })
    this.postSrvc.getPostById(id).subscribe((res: GetPostInterface) => {
      console.log(res.datas);
    }, (err) => {
      console.log(err);
    })

  }

  // eachUser() {
  //   this.route.navigate()
  // }

  otherProfile(id: string) {
    if (localStorage.getItem('userId') === id) {
      this.route.navigate(['profile'])
    } else {
      this.route.navigate([`other-user-profile/${id}`]);
    }
  }

}
