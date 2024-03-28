import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserProfileDetailsInterace, UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeUpdationComponent } from '../profil-imge-updation/profil-imge-updation.component';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit, OnDestroy {

  @ViewChild('profileEdit') profileEdit: NgForm;
  private refreshSubscription: Subscription;


  userprofileDetials: UserProfileDetailsInterace[] = [];

  userName: string = '';
  fullName: string = '';
  profileImg: string = '';
  userBio: string = '';
  gender: string = '';


  constructor(private homeSrvc: HomeService, private dialog: MatDialog, private profileSrvc: ProfileService, private snack: MatSnackBar) { }

  ngOnInit(): void {

    // this.homeSrvc.refreshSubject.subscribe(() => {
      // this.updatingUserCredentials();
      // console.log('llll');

    // })
    this.updatingUserCredentials()
  }

  updatingUserCredentials() {
    let value: string;
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userprofileDetials.push(res.datas);

      this.userName = res.datas.username;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
      value = 'wo'
      
    }, (err) => {
      console.log(err);
    })
  }

  imageUpdating() {
    this.dialog.open(ProfilImgeUpdationComponent);
    // this.updatingUserCredentials();
  }



  submit() {
    this.profileSrvc.updateProfile(this.profileEdit).subscribe((res: { message: string }) => {
      if (res.message === 'Success') {
        this.snack.open('Profile Updated', 'Ok', {
          duration: 2000,
          direction: 'ltr'
        })
      } else {
        this.snack.open('Something went wrong', 'Ok', {
          duration: 2000,
          direction: 'ltr'
        })
      }
    }, (err) => {
      console.log(err);
    })
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent)
  }

  ngOnDestroy(): void {
    // if (this.refreshSubscription) {
    //   this.refreshSubscription.unsubscribe();
    // }
  }

}
