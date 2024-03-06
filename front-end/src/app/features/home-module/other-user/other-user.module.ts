import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OtherUserProfileComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OtherUserModule { }
