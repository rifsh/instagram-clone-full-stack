import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { HomeModuleModule } from './home-module/home-module.module';
  import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AuthModuleModule,
    FormsModule,
    HomeModuleModule,
  ]
})
export class FeaturesModule { }
