import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAppComponent } from './get-app/get-app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    GetAppComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    GetAppComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
