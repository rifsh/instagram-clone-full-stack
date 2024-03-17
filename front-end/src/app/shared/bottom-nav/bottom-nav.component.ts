import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from 'src/app/features/home-module/post/add-post/add-post.component';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent {

  constructor(private dialog: MatDialog) {}

  addPost() {
    this.dialog.open(AddPostComponent)
  }

}
