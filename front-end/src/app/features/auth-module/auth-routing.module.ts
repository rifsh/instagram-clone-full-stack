import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';

const router: Routes = [
    { path: "", component: LoginComponent },
    { path: "sign-up", component: SignupComponent },
]

@NgModule({
    imports: [RouterModule.forChild(router)],
    exports: []
})

export class AppAuthRoutingModule {}