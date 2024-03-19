import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/core/Services/profile.service';

@Component({
  selector: 'app-profil-imge-updation',
  templateUrl: './profil-imge-updation.component.html',
  styleUrls: ['./profil-imge-updation.component.css']
})
export class ProfilImgeUpdationComponent implements OnChanges {

  @ViewChild('image') formValues: NgForm;

  loader: boolean = false;
  submitBtn: boolean = true
  file: File = null;

  constructor(private profileSrvc: ProfileService, private dialogRef: DialogRef, private snack: MatSnackBar) {

  }
  selectImage(event) {
    this.formValues.value.image = event.target.files[0];
    if (event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      this.formValues.value.image = this.file;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');

  }

  imageUpadting() {
    this.loader = true;
    this.submitBtn = false;

    this.profileSrvc.imageUpdating(this.formValues, this.file).subscribe((res: { Message: string }) => {
      console.log(res.Message === 'Successfully updated');
      if (res) {
        this.loader = false;
        this.submitBtn = true;
        this.snack.open('Image Updated', 'Ok', {
          duration: 2000,
          direction: 'ltr'
        })
        this.dialogRef.close();

      }
    }, (err) => {
      this.loader = false;
      this.submitBtn = true
      alert('Something went wrong')
    })
  }

  imageRemoving() {
    this.profileSrvc.imgRemoving().subscribe((res) => {
      console.log(res);
      this.snack.open('Image Removed', 'Ok', {
        duration: 2000,
        direction: 'ltr'
      })
      this.dialogRef.close();
    }, (err) => {
      console.log(err);

    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
