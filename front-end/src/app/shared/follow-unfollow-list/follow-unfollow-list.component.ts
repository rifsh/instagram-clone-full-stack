import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { FollowersLiset, UserFollowersInterface } from 'src/app/model/userInterface';
import { RemoveFollowComponent } from '../remove-follow/remove-follow.component';

@Component({
  selector: 'app-follow-unfollow-list',
  templateUrl: './follow-unfollow-list.component.html',
  styleUrls: ['./follow-unfollow-list.component.css']
})
export class FollowUnfollowListComponent implements OnInit {
  @Input() followValue: string;
  @Input() id: string;
  @Input() componentValue: string;
  @Output() searchText: EventEmitter<string> = new EventEmitter<string>;


  followerList: FollowersLiset[] = [];
  searchValue:string;
  followerHeading: boolean = false;
  followingHeading: boolean = false;
  userButtons: boolean;
  otherUserButtons: boolean;
  userId: string = localStorage.getItem('userId');


  constructor(private profileSrvc: ProfileService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

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
        res.datas.followers.map((x) => { return this.followerList.push(x) });

      }, (err) => {
        console.log(err);
      })
    } else if (this.data.followValue === "following") {
      this.followingHeading = true;
      this.followerHeading = false;
      this.profileSrvc.getFolling(this.data.id).subscribe((res: UserFollowersInterface) => {
        res.datas.following.map((x) => { return this.followerList.push(x) });
      }, (err) => {
        console.log(err);
      })
    }
  }

  searchOperation() {
    this.searchText.emit(this.searchValue);
    console.log(this.followerList.filter((x)=>{return x.fullname.toLowerCase().includes(this.searchValue) || x.username.toLowerCase().includes(this.searchValue) }));
    // console.log(this.followerList);
    
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

}
