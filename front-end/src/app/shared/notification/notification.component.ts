import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { UserDetailInterface, UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('4000ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @Input() buttonType: string;

  followBtn: string[] = [];
  followBtnClass: boolean;
  userId: string = localStorage.getItem('userId');

  allusers: UserDetailInterface[] = []

  constructor(private profileSrvc: ProfileService, private route: Router) { }

  ngOnInit(): void {
    this.buttonType = 'follow'
    const userId: string = localStorage.getItem('userId');
    this.profileSrvc.allUsers().subscribe((allUser: { status: string, datas: [UserDetailInterface] }) => {
      allUser.datas.filter((x) => { return x._id !== userId }).map((x) => { return this.allusers.push(x) });
    }, (err) => {
      console.log(err);
    })
  }

  followAndUnFollow(userIds: string) {
    this.profileSrvc.following(userIds).subscribe((res: { message: string }) => {
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

  viewProfile(id: string) {
    this.route.navigate([`other-user-profile/${id}`]);

  }

  gotToMessage() {
    this.route.navigate([`messaging`]);

  }

}
