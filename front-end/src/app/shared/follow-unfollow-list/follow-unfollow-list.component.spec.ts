import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUnfollowListComponent } from './follow-unfollow-list.component';

describe('FollowUnfollowListComponent', () => {
  let component: FollowUnfollowListComponent;
  let fixture: ComponentFixture<FollowUnfollowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowUnfollowListComponent]
    });
    fixture = TestBed.createComponent(FollowUnfollowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
