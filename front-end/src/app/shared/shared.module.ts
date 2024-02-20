import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAppComponent } from './get-app/get-app.component';



@NgModule({
  declarations: [
    GetAppComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GetAppComponent
  ]
})
export class SharedModule { }
