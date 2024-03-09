import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from 'src/app/core/Services/profile.service';

@Component({
  selector: 'app-remove-follow',
  templateUrl: './remove-follow.component.html',
  styleUrls: ['./remove-follow.component.css']
})
export class RemoveFollowComponent implements OnInit {
  @Input() componentValue: string;
  @Input() id: string;
  @Input() profile: string;
  @Input() name: string;
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profileSrvc: ProfileService, private dialog: MatDialogRef<RemoveFollowComponent>) { }

  ngOnInit(): void {
    console.log(this.data.componentValue);
  }

  remove() {
    if (this.data.componentValue === 'removefollower') {
      this.profileSrvc.removeFollower(this.data.id).subscribe((res: { message: string }) => {
        console.log(res.message);
        if (res.message === 'Removed') {
          this.dialog.close(true);
        }
      }, (err) => {
        console.log(err);
      })
    }
    if (this.data.componentValue === 'removefollowing') {
      this.profileSrvc.removeFollowing(this.data.id).subscribe((res) => {
        this.dialog.close(true);
      }, (err) => {
        console.log(err);
      })
    }
  }

  cancel() {
    this.dialog.close(true);
  }

}
