import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserDetailInterface, UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userDetails: UserDetailInterface;
  userName:string = '';
  fullName:string = '';
  profileImg:string = '';


  constructor(private homeSrvc: HomeService, private router:Router) { }

  ngOnInit(): void {
    
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userDetails = res.datas;
      this.userName = res.datas.username;
      this.fullName = res.datas.fullname;
      this.profileImg = res.datas.profilePic;
    }, (err) => {
      console.log(err);
    })
  }

  editProfile() {
    this.router.navigate(['edit-profile'])
  }

}
