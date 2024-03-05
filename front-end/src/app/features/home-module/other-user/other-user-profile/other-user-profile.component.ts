import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { UserByIdInterface, UserDetailInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent implements OnInit {
  @Input() buttonType: string;

  followBtn: string[] = [];
  // followingBtn: boolean = false;

  followBtnClass:boolean;
  userIds: string = '';
  userName: string = '';
  userBio: string = '';
  fullName: string = '';
  profileImg: string = '';
  followers: number;
  following: number;

  userId: string;
  user: UserDetailInterface[] = [];

  constructor(private route: ActivatedRoute, private profileSrvc: ProfileService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    const mainUserId: string = localStorage.getItem('userId');

    this.profileSrvc.allUsers().subscribe((res: UserByIdInterface) => {
      this.user.push(res.datas);
    }, (err) => {
      console.log(err);
    })
    this.profileSrvc.userById(this.userId).subscribe((res: UserByIdInterface) => {
      this.userIds = res.datas._id;
      this.userName = res.datas.username;
      this.userBio = res.datas.bio;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
      this.followers = res.datas.followers.length;
      this.following = res.datas.following.length;
      this.followBtn = res.datas.followers.filter((X) => { return X === mainUserId });
      // console.log(res.datas.followers.filter((X) => { return X === mainUserId }));

      if (this.followBtn.length === 0) {
        this.buttonType = "follow";
      } else {
        this.buttonType = "following";

      }
    }, (err) => {
      console.log(err);
    });

  }

  followAndUnFollow() {
    this.profileSrvc.following(this.userIds).subscribe((res: { message: string }) => {
      if (res.message === "Following") {
        this.buttonType = "following";
      } else if (res.message === "unFollowed") {
        this.buttonType = "follow";
        this.followBtnClass = true;
      }
    }, (err) => {
      console.log(err);
    })
  }


}
