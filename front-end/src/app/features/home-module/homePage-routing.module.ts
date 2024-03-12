import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { NgModule } from "@angular/core";
import { authGuard } from "src/app/core/guard/auth.guard";
import { ProfileComponent } from "./user-profile/profile/profile.component";
import { UserEditProfileComponent } from "./user-profile/user-edit-profile/user-edit-profile.component";
import { ViewpostComponent } from "./viewpost/viewpost.component";
import { OtherUserProfileComponent } from "./other-user/other-user-profile/other-user-profile.component";
import { SearchUsersComponent } from "./user-profile/search-users/search-users.component";


const router: Routes = [
    {
        path: '', component: HomePageComponent, canActivate: [authGuard], children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'edit-profile', component: UserEditProfileComponent, outlet: 'primary' },
            { path: 'home', component: ViewpostComponent, outlet: 'primary' },
            { path: 'other-user-profile/:id', component: OtherUserProfileComponent, outlet: 'primary' },
            { path: 'user-search', component: SearchUsersComponent, outlet: 'primary' },
            // { path: 'profile/user-post', component: UserPostComponent },


        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
})

export class homeAppRoutingModule { }