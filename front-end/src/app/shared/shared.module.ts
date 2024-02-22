import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAppComponent } from './get-app/get-app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    GetAppComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    GetAppComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
