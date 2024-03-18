import { DialogRef } from '@angular/cdk/dialog';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/core/Services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  @ViewChild('resetPasswordFrom') form:NgForm

  constructor(private profileSrvc:ProfileService,private snack:MatSnackBar,private dialog:DialogRef) {}

  resetPassword() {
    // console.log(this.form.value);
    this.profileSrvc.changePassword(this.form.value).subscribe((res:{message:string})=>{
      if (res.message === 'Password changed') {
        this.snack.open('Password changed Successfully','Ok');
        this.dialog.close();
      } 
      if (res.message === 'Entered password is not match') {
        this.snack.open('Enter a valid password','Ok')
        this.dialog.close()
      }
    },(err)=>{
      this.snack.open('Something went wrong','Ok')
      
    })
  }

}
