import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserPostComponent } from "./user-post/user-post.component";
import { HomePageComponent } from "../home-page/home-page.component";
import { ProfileComponent } from "./profile/profile.component";


const router: Routes = [
    // { path: 'userPosts', component: UserPostComponent, outlet: 'userPosts' },

]

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule { }