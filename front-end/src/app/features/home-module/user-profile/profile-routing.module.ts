import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const router: Routes = [
    // { path: 'userPosts', component: UserPostComponent, outlet: 'userPosts' },

]

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: [RouterModule]
})

export class UserProfileRoutingModule { }