import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { NgModule } from "@angular/core";
import { authGuard } from "src/app/core/guard/auth.guard";
import { ProfileComponent } from "./user-profile/profile/profile.component";
import { UserEditProfileComponent } from "./user-profile/user-edit-profile/user-edit-profile.component";


const router: Routes = [
    {
        path: '', component: HomePageComponent, canActivate: [authGuard], children: [
            { path: 'profile', component: ProfileComponent, outlet: 'primary' },
            { path: 'edit-profile', component: UserEditProfileComponent, outlet: 'primary' }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
})

export class homeAppRoutingModule { }