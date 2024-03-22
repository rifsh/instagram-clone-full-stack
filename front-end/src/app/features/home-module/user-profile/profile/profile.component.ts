import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserDetailInterface, UserProfileDetailsInterace, UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeViewComponent } from '../profil-imge-view/profil-imge-view.component';
import { PostService } from 'src/app/core/Services/post.service';
import { GetPostInterface, userPostsInterface } from 'src/app/model/postResponseInterface';
import { FollowUnfollowListComponent } from 'src/app/shared/follow-unfollow-list/follow-unfollow-list.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {

  postTemplate: boolean = true;
  savedTemplate: boolean = false;

  userDetails: UserDetailInterface[] = [];
  userId: string = localStorage.getItem('userId');

  userPosts: userPostsInterface[] = [];

  constructor(private homeSrvc: HomeService, private postSrvc: PostService, private router: Router, private dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface)=>{
      this.userDetails.push(res.datas);
    })
    this.postSrvc.getPost().subscribe((res: GetPostInterface) => {
      this.userPosts = res.datas.filter((x) => { return x.postedBy._id === this.userId });
      // console.log(this.userPosts);
      
    }, (err) => {
      console.log(err);
    })
  }

  getUserProfile() {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface)=>{
      this.userDetails.push(res.datas);
      console.log(res.datas);
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

  follow(value: string) {
    this.dialog.open(FollowUnfollowListComponent, {
      exitAnimationDuration: '1s',
      data: {
        followValue: value,
        id: this.userId,
        componentValue: 'user'
      }
    });
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
