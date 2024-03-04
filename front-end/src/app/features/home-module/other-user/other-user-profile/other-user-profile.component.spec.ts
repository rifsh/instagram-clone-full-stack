import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherUserProfileComponent } from './other-user-profile.component';

describe('OtherUserProfileComponent', () => {
  let component: OtherUserProfileComponent;
  let fixture: ComponentFixture<OtherUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtherUserProfileComponent]
    });
    fixture = TestBed.createComponent(OtherUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
