import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilImgeUpdationComponent } from './profil-imge-updation.component';

describe('ProfilImgeUpdationComponent', () => {
  let component: ProfilImgeUpdationComponent;
  let fixture: ComponentFixture<ProfilImgeUpdationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilImgeUpdationComponent]
    });
    fixture = TestBed.createComponent(ProfilImgeUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
