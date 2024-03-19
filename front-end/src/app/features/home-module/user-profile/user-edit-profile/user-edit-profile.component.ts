import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeUpdationComponent } from '../profil-imge-updation/profil-imge-updation.component';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-user-edit-profile',
  templateUrl: './user-edit-profile.component.html',
  styleUrls: ['./user-edit-profile.component.css']
})
export class UserEditProfileComponent implements OnInit {

  @ViewChild('profileEdit') profileEdit: NgForm;

  userName: string = '';
  fullName: string = '';
  profileImg: string = '';
  userBio: string = '';
  gender: string = '';


  constructor(private homeSrvc: HomeService, private dialog: MatDialog, private profileSrvc: ProfileService, private snack: MatSnackBar) { }

  ngOnInit(): void {

    this.homeSrvc.refreshSubject.subscribe(()=>{
      this.updatingUserCredentials()
    })

    this.updatingUserCredentials();
  }

  updatingUserCredentials() {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userName = res.datas.username;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
      this.profileEdit.setValue({
        fullname: res.datas.fullname,
        username: res.datas.username,
        bio: res.datas.bio,
        gender: res.datas.gender,

      })
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

}
