import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/core/Services/post.service';
import { PostResponseInterface } from 'src/app/model/postResponseInterface';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  file: File = null;
  postImg:string;

  @ViewChild('addPostImg') formValues: NgForm;

  constructor(private postsrvc: PostService) { }

  selectFile(event) {
    this.formValues.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      this.formValues.value.image = this.file;
    }
    this.postsrvc.addPostSrvc(this.formValues, this.file).subscribe((res:PostResponseInterface) => {
      console.log(res.datas.image);
      this.postImg = res.datas.image;
    }, (err) => {
      console.log(err);
    })

  }

  addPost() {

  }

}
