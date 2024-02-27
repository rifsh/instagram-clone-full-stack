import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PostModule { }
