import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path:"", component:LoginComponent},
  // {path:"sign-up", component:SignupComponent},
  // {path:"home", component:HomePageComponent},
  {path:'',loadChildren:()=>import('./features/auth-module/auth-routing.module').then(m=>m.AppAuthRoutingModule)},
  {path:'feature', loadChildren:()=>import('./features/home-module/homePage-routing.module').then(m=>m.homeAppRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
