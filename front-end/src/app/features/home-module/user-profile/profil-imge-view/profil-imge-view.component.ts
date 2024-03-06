import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/core/Services/home.service';
import { ProfileService } from 'src/app/core/Services/profile.service';
import { UserSignupInterface } from 'src/app/model/userInterface';

@Component({
  selector: 'app-profil-imge-view',
  templateUrl: './profil-imge-view.component.html',
  styleUrls: ['./profil-imge-view.component.css']
})
export class ProfilImgeViewComponent implements OnInit {
  @Input() id:string;
  navProfilePic: string = ''

  constructor(private profileSrvc: ProfileService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.profileSrvc.userById(this.data.id).subscribe((res: UserSignupInterface) => {
      this.navProfilePic = res.datas.profilePic;
    }, (err) => {
      console.log(err);
    })
  }

}
