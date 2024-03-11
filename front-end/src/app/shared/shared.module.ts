import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAppComponent } from './get-app/get-app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { AllPostComponent } from './all-post/all-post.component';
import { AllSavedComponent } from './all-saved/all-saved.component';
import { FooterComponent } from './footer/footer.component';
import { FollowUnfollowListComponent } from './follow-unfollow-list/follow-unfollow-list.component';
import { RemoveFollowComponent } from './remove-follow/remove-follow.component';
import { FormsModule } from '@angular/forms';
import { PostViewingComponent } from './post-viewing/post-viewing.component';



@NgModule({
  declarations: [
    GetAppComponent,
    NavBarComponent,
    AllPostComponent,
    AllSavedComponent,
    FooterComponent,
    FollowUnfollowListComponent,
    RemoveFollowComponent,
    PostViewingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports:[
    GetAppComponent,
    NavBarComponent,
    AllPostComponent,
    AllSavedComponent,
    FooterComponent,
    FollowUnfollowListComponent,
    RemoveFollowComponent
  ]
})
export class SharedModule { }
