import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',loadChildren:()=>import('./features/auth-module/auth-routing.module').then(m=>m.AppAuthRoutingModule)},
  {path:'feature', loadChildren:()=>import('./features/home-module/homePage-routing.module').then(m=>m.homeAppRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
