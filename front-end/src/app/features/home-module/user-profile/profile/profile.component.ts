import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserDetailInterface, UserSignupInterface } from 'src/app/model/userInterface';
import { ProfilImgeViewComponent } from '../profil-imge-view/profil-imge-view.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userDetails: UserDetailInterface;
  userName: string = '';
  userBio: string = '';
  fullName: string = '';
  profileImg: string = '';
  // profileImg: string = '';



  constructor(private homeSrvc: HomeService, private router: Router, private dialog: MatDialog, private route:Router) { }

  ngOnInit(): void {

    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userDetails = res.datas;
      this.userName = res.datas.username;
      this.fullName = res.datas.fullname;
      this.userBio = res.datas.bio
      this.profileImg = res.datas.profilePic;
    }, (err) => {
      console.log(err);
    })
  }

  viewingProfile() {
    this.dialog.open(ProfilImgeViewComponent)
  }

  editProfile() {
    this.router.navigate(['edit-profile'])
  }

  posts() {
    // this.route.navigate(['user-post'])
  }

}
