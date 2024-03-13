import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/core/Services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit{
  @Input() postId: string

  constructor(private postSrvc: PostService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  postDeleting() {
    this.postSrvc.postDelete(this.data.postId).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
      
    })
  }

}
