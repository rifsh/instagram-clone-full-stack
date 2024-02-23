import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/core/Services/home.service';
import { UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-profil-imge-view',
  templateUrl: './profil-imge-view.component.html',
  styleUrls: ['./profil-imge-view.component.css']
})
export class ProfilImgeViewComponent implements OnInit {

  navProfilePic: string = ''

  constructor(private dialog: MatDialog, private homeSrvc: HomeService) { }

  ngOnInit(): void {
    this.homeSrvc.getUser().subscribe((res: UserSignupInterface) => {
      this.navProfilePic = res.datas.profilePic;
      console.log(res.datas.profilePic);
    }, (err) => {
      console.log(err);

    })
  }

}
