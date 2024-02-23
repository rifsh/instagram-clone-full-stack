import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { homeAppRoutingModule } from './homePage-routing.module';
import { FormsModule } from '@angular/forms';
import { UserProfileModule } from './user-profile/user-profile.module';



@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    FormsModule,
    homeAppRoutingModule
  ]
})
export class HomeModuleModule { }
