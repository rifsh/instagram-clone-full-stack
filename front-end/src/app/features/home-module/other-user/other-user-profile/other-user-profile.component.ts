import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { UserByIdInterface, UserDetailInterface } from 'src/app/model/userInterface';
import { ProfilImgeViewComponent } from '../../user-profile/profil-imge-view/profil-imge-view.component';
import { FollowUnfollowListComponent } from 'src/app/shared/follow-unfollow-list/follow-unfollow-list.component';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent implements OnInit {
  @Input() buttonType: string;

  followBtn: string[] = [];
  followBtnClass: boolean;
  userIds: string = '';
  userName: string = '';
  userBio: string = '';
  fullName: string = '';
  profileImg: string = '';
  followers: number;
  following: number;

  userId: string;
  user: UserDetailInterface[] = [];

  constructor(private route: ActivatedRoute, private profileSrvc: ProfileService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.fetchingUserData();

  }

  fetchingUserData() {
    const mainUserId: string = localStorage.getItem('userId');

    this.profileSrvc.userById(this.userId).subscribe((res: UserByIdInterface) => {
      this.userIds = res.datas._id;
      this.userName = res.datas.username;
      this.userBio = res.datas.bio;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
      this.followers = res.datas.followers.length;
      this.following = res.datas.following.length;
      this.followBtn = res.datas.followers.filter((X) => { return X === mainUserId });
      this.user.push(res.datas);
      if (this.followBtn.length === 0) {
        this.buttonType = 'follow';
      }
    }, (err) => {
      console.log(err);
    });

  }

  followAndUnFollow() {
    this.profileSrvc.following(this.userIds).subscribe((res: { message: string }) => {
      if (res.message === "Following") {
        this.buttonType = "following";
        this.fetchingUserData()
      } else if (res.message === "unFollowed") {
        this.buttonType = "follow";
        this.fetchingUserData()
        this.followBtnClass = true;
      }
    }, (err) => {
      console.log(err);
    })
  }

  viewingProfile() {
    this.dialog.open(ProfilImgeViewComponent, {
      data: { id: this.userId },
    });

  }

  follow(value: string) {
    this.dialog.open(FollowUnfollowListComponent, {
      exitAnimationDuration: '1s',
      data: {
        followValue: value,
        id: this.userId,
        componentValue: 'otheruser'
      }
    });
  }

  gotToMessage() {
    this.router.navigate(['messaging']);
  }

}
