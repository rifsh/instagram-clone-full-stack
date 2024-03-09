import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFollowComponent } from './remove-follow.component';

describe('RemoveFollowComponent', () => {
  let component: RemoveFollowComponent;
  let fixture: ComponentFixture<RemoveFollowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveFollowComponent]
    });
    fixture = TestBed.createComponent(RemoveFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
