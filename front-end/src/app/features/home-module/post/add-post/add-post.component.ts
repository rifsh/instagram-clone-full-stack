import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/core/Services/post.service';
import { PostResponseInterface } from 'src/app/model/postResponseInterface';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  uploadPage: boolean = true;
  file: File = null;
  loading: boolean = false;
  postBtn: boolean = true;
  postImg: boolean = false;
  uploadBtn: boolean = true;
  postCaption: boolean = false;
  selectedImage: string | null = null;


  @ViewChild('addPostImg') formValues: NgForm;

  constructor(private postsrvc: PostService, private dailogRef: DialogRef, private snack: MatSnackBar) { }

  selectFile(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.uploadBtn = false;
        this.postImg = true;
      };
      reader.readAsDataURL(file);
    }

    this.formValues.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      this.formValues.value.image = this.file;
      this.uploadPage = false;
    }

  }

  next() {
    this.uploadBtn = false;
    this.postImg = false;
    this.postCaption = true;
  }

  addPost() {
    this.loading = true;
    this.postBtn = false;
    this.postsrvc.addPostSrvc(this.formValues, this.file).subscribe((res: PostResponseInterface) => {
      console.log(res);
      if (res.message === 'Success') {
        console.log('sksjdksd');
        this.loading = false;
        this.postBtn = true;
        this.snack.open('Post added', 'Ok', {
          duration: 2000,
          direction: 'ltr'
        })
        this.dailogRef.close()
      }
    }, (err) => {
      console.log(err);
    })
  }

}
