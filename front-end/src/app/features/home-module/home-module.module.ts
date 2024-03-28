import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { homeAppRoutingModule } from './homePage-routing.module';
import { FormsModule } from '@angular/forms';
import { UserProfileModule } from './user-profile/user-profile.module';
import { PostModule } from './post/post.module';
import { ViewpostComponent } from './viewpost/viewpost.component';
import { StoryComponent } from './story/story.component';
import { OtherUserModule } from './other-user/other-user.module';
import { StoryIconComponent } from './story/story-icon/story-icon.component';
import { MessageComponent } from './message/message.component';
import { TimeAgoPipe } from 'src/app/time-ago.pipe';
import { RightSideComponent } from './viewpost/right-side/right-side.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ViewpostComponent,
    StoryComponent,
    StoryIconComponent,
    MessageComponent,
    TimeAgoPipe,
    RightSideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileModule,
    PostModule,
    FormsModule,
    homeAppRoutingModule,
    OtherUserModule,
    
  ]
})
export class HomeModuleModule { }
