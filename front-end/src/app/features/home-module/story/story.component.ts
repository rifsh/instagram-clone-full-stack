import { Component } from '@angular/core';

interface UserStory {
  profilePictureUrl: string;
  userName: string;
  hasStory: boolean; // Flag to indicate if user has an active story
}

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  stories: UserStory[] = [
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    // ... add more stories
  ];

  constructor() { }

}
