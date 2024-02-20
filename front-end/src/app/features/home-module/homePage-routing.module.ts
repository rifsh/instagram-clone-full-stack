import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { NgModule } from "@angular/core";
import { authGuard } from "src/app/core/guard/auth.guard";


const router:Routes = [
    {path:'', component:HomePageComponent,canActivate:[authGuard]}
]

@NgModule({
    imports:[RouterModule.forChild(router)],
    exports:[RouterModule]
})

export class homeAppRoutingModule{}