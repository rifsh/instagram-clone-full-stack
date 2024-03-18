import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { FollowersLiset, UserFollowersInterface } from 'src/app/model/userInterface';
import { RemoveFollowComponent } from '../remove-follow/remove-follow.component';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { Location } from '@angular/common'

@Component({
  selector: 'app-follow-unfollow-list',
  templateUrl: './follow-unfollow-list.component.html',
  styleUrls: ['./follow-unfollow-list.component.css']
})
export class FollowUnfollowListComponent implements OnInit {
  @Input() buttonType: string;
  @Input() followValue: string;
  @Input() id: string;
  @Input() componentValue: string;
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>;


  followBtn: string[] = [];
  followBtnClass: boolean;
  followerList: FollowersLiset[] = [];
  searchValue: string;
  followerHeading: boolean = false;
  followingHeading: boolean = false;
  userButtons: boolean;
  otherUserButtons: boolean;
  userId: string = localStorage.getItem('userId');


  constructor(private profileSrvc: ProfileService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private route: Router, private closeModal: DialogRef, private location: Location) { }

  ngOnInit(): void {
    if (this.data.componentValue === 'user') {
      this.userButtons = true;
      this.otherUserButtons = false;
    }

    if (this.data.componentValue === 'otheruser') {
      this.userButtons = false;
      this.otherUserButtons = true;
    }

    if (this.data.followValue === "followers") {
      this.followerHeading = true;
      this.followingHeading = false;
      this.profileSrvc.getFollowers(this.data.id).subscribe((res: UserFollowersInterface) => {
        res.datas.followers.map((x) => { return this.followerList.push(x) })
        // console.log(this.followerList.map((x) => { return x._id === this.userId }));
      }, (err) => {
        console.log(err);
      })

    } else if (this.data.followValue === "following") {
      this.followingHeading = true;
      this.followerHeading = false;
      this.profileSrvc.getFollowing(this.data.id).subscribe((res: UserFollowersInterface) => {
        res.datas.following.map((x) => { return this.followerList.push(x) });
      }, (err) => {
        console.log(err);
      })
    }
  }

  searchOperation() {
    this.searchText.emit(this.searchValue);
    this.followerList.filter((x) => { return x.fullname.toLowerCase().includes(this.searchValue) || x.username.toLowerCase().includes(this.searchValue) })
    console.log(this.followerList);
    // console.log(this.searchValue);


  }

  removeFollower(componentName: string, userId: string) {
    let profilePic: string = '';
    let fullName: string = '';
    this.followerList.map((x) => { return profilePic = x.profilePic, fullName = x.fullname });
    this.dialog.open(RemoveFollowComponent, {
      data: {
        componentValue: componentName,
        id: userId,
        profile: profilePic,
        name: fullName
      }
    })
  }

  followAndUnFollow(userIds:string) {
    this.buttonType = 'follow';
    this.profileSrvc.following(userIds).subscribe((res: { message: string }) => {
      console.log(res);
      
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

  gotToMessage() {

  }

  viewProfile(id: string) {

    if (localStorage.getItem('userId') === id) {
      this.closeModal.close();
      this.route.navigate(['profile'])
    } else {
      this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.route.navigate([`other-user-profile/${id}`])
      });
      this.closeModal.close();

    }
  }

}
