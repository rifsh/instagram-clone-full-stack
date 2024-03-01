import { Component, OnInit } from '@angular/core';
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


  constructor(private postSrvc: PostService) { }

  ngOnInit(): void {
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      res.datas.map((x) => { return this.allPosts.push(x) })
      // this.allPosts.push(res)
    }, (err) => {
      console.log(err);
    })
  }

  likeBtn(id: string): void {
    this.postSrvc.postLiking(id).subscribe((res:PostInterface) => {
      this.liked = !this.liked;
    }, (err) => {
      console.log(err);

    })
  }

}
