import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewingComponent } from './post-viewing.component';

describe('PostViewingComponent', () => {
  let component: PostViewingComponent;
  let fixture: ComponentFixture<PostViewingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostViewingComponent]
    });
    fixture = TestBed.createComponent(PostViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
