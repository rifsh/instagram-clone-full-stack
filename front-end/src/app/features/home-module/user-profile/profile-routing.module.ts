import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";


const router:Routes = [
    {}
]

@NgModule({
    imports:[RouterModule.forChild(router)],
    exports:[RouterModule]
})

export class UserProfileRoutingModule{}