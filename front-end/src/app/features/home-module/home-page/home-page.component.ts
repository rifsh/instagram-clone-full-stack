import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserDetailInterface, UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userDetails: UserDetailInterface[] = []

  constructor(private homeSrvc: HomeService) { }

  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.userDetails.push(res.datas);
    }, (err) => {
      console.log(err);
    })
  }

}
