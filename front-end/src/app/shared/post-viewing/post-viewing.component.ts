import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, PostInterface, PostResponseInterface, ViewpostInterface } from 'src/app/model/postResponseInterface';

@Component({
  selector: 'app-post-viewing',
  templateUrl: './post-viewing.component.html',
  styleUrls: ['./post-viewing.component.css']
})
export class PostViewingComponent implements OnInit {
  @Input() id: string;
  profilePic:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private postSrvc: PostService) { }

  ngOnInit(): void {
    this.postSrvc.getPostById(this.data.id).subscribe((res: PostResponseInterface) => {
      this.profilePic = res.datas.image
    }, (err) => {
      console.log(err);
    })
  }

}