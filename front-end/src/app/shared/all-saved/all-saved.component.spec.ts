import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSavedComponent } from './all-saved.component';

describe('AllSavedComponent', () => {
  let component: AllSavedComponent;
  let fixture: ComponentFixture<AllSavedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSavedComponent]
    });
    fixture = TestBed.createComponent(AllSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
