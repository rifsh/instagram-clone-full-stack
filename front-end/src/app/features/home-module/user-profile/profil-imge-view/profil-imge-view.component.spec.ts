import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilImgeViewComponent } from './profil-imge-view.component';

describe('ProfilImgeViewComponent', () => {
  let component: ProfilImgeViewComponent;
  let fixture: ComponentFixture<ProfilImgeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilImgeViewComponent]
    });
    fixture = TestBed.createComponent(ProfilImgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
