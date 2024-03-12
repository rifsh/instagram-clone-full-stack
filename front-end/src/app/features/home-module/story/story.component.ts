import { Component, Input } from '@angular/core';

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
  storiess: UserStory[] = [
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    { profilePictureUrl: '../../../../assets/photo-1633886897663-44c707d71904.jpg', userName: 'user1', hasStory: true },
    // ... add more stories
  ];
  @Input() profileInfo;

  public fetched: boolean = true;
  public stories: any[] = [];
  public styleTransform = [];
  public visibleStories: any[] = [];
  public imgUrl: string = '/assets/img/userdata/';
  public storyIndex: number = 0;


  ngOnInit(): void {
    // this.storyService.getStories().subscribe((stories) => {
    //   this.fetched = true;
    //   for (let i = 0; i < stories.length; i++) {
    //     this.stories.push({
    //       userId: stories[i].userid,
    //       profilePhoto: this.imgUrl + stories[i].profilephoto,
    //       storyDate: stories[i].storydate,
    //     });
    //   }
    //   this.visibleStories = this.populateVisibleStories();
    //   this.createStyle();
    // });
  }

  public clickPrevStory(): void {
    if (this.storyIndex > 3) {
      this.storyIndex = this.storyIndex - 4;
    }
    this.visibleStories = this.populateVisibleStories();
  }

  public clickNextStory(): void {
    if (this.stories.length > this.storyIndex + 7) {
      this.storyIndex = this.storyIndex + 4;
    }
    this.visibleStories = this.populateVisibleStories();
  }

  private populateVisibleStories(): any {
    const uptoIndex =
      this.stories.length > this.storyIndex + 8
        ? this.storyIndex + 8
        : this.stories.length;

    let tempStories = [];
    for (let i = this.storyIndex; i < uptoIndex; i++) {
      tempStories.push(this.stories[i]);
    }

    return tempStories;
  }

  private createStyle(): void {
    this.stories.map((story, index) => {
      this.styleTransform.push({
        transform: 'translateX(' + 80 * index + 'px)',
      });
    });
  }

  constructor() { }

}
