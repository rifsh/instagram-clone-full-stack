import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditProfileComponent } from './user-edit-profile/user-edit-profile.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfilImgeUpdationComponent } from './profil-imge-updation/profil-imge-updation.component';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfilImgeViewComponent } from './profil-imge-view/profil-imge-view.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    UserEditProfileComponent,
    ProfileComponent,
    ProfilImgeUpdationComponent,
    ProfilImgeViewComponent,
    UserPostComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule, 
    // UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
