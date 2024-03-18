import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfilImgeUpdationComponent } from './profil-imge-updation/profil-imge-updation.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfilImgeViewComponent } from './profil-imge-view/profil-imge-view.component';
import { UserProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchUsersComponent } from './search-users/search-users.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangePasswordComponent } from './user-edit-profile/change-password/change-password.component';




@NgModule({
  declarations: [
    UserEditProfileComponent,
    ProfileComponent,
    ProfilImgeUpdationComponent,
    ProfilImgeViewComponent,
    SearchUsersComponent,
    ChangePasswordComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
    MatProgressSpinnerModule, 
    MatSidenavModule,
    UserProfileRoutingModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ]
})
export class UserProfileModule { }
