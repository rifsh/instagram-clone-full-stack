import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { HomeModuleModule } from './home-module/home-module.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AuthModuleModule,
    HomeModuleModule,
  ]
})
export class FeaturesModule { }
