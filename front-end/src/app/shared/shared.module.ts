import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAppComponent } from './get-app/get-app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { AllPostComponent } from './all-post/all-post.component';
import { AllSavedComponent } from './all-saved/all-saved.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    GetAppComponent,
    NavBarComponent,
    AllPostComponent,
    AllSavedComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    GetAppComponent,
    NavBarComponent,
    AllPostComponent,
    AllSavedComponent,
    FooterComponent
  ]
})
export class SharedModule { }
