import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './user-profile/profile/profile.component';
import { homeAppRoutingModule } from './homePage-routing.module';



@NgModule({
  declarations: [
    HomePageComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    homeAppRoutingModule
  ]
})
export class HomeModuleModule { }
