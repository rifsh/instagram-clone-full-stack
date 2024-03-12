import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeUpdationComponent } from '../profil-imge-updation/profil-imge-updation.component';
import { ProfileService } from 'src/app/core/Services/profile.service';

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
  

  constructor(private homeSrvc: HomeService, private dialog: MatDialog, private profileSrvc:ProfileService) { }

  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      // this.userDetails = res.datas;
      this.userName = res.datas.username;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
      // this.userBio = res.datas.bio;
      // this.gender = res.datas.gender;
      
    }, (err) => {
      console.log(err);
    })
  }

  imageUpdating() {
    this.dialog.open(ProfilImgeUpdationComponent)
  }

  submit() {
    this.profileSrvc.updateProfile(this.profileEdit).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
      
    })
  }

}
