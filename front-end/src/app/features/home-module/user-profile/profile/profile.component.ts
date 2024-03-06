import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserDetailInterface, UserProfileDetailsInterace, UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeViewComponent } from '../profil-imge-view/profil-imge-view.component';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, userPostsInterface } from 'src/app/model/postResponseInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  postTemplate: boolean = true;
  savedTemplate: boolean = false;

  userDetails: UserDetailInterface[] = [];
  userId: string = localStorage.getItem('userId');

  userPosts: userPostsInterface[] = []

  constructor(private homeSrvc: HomeService, private postSrvc: PostService, private router: Router, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userDetails.push(res.datas);
    }, (err) => {
      console.log(err);
    })
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      this.userPosts = res.datas.filter((x) => { return x.postedBy._id === this.userId });  
    }, (err) => {
      console.log(err);
    })
  }

  viewingProfile() {
    this.dialog.open(ProfilImgeViewComponent, {
      data: { id: localStorage.getItem('userId') }
    });
  }

  editProfile() {
    this.router.navigate(['edit-profile'])
  }

  posts() {
    this.postTemplate = true;
    this.savedTemplate = false;

  }

  saved() {
    this.savedTemplate = true;
    this.postTemplate = false;
  }


}
