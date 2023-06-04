import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosUserComponent } from './ciclos-user.component';

describe('CiclosUserComponent', () => {
  let component: CiclosUserComponent;
  let fixture: ComponentFixture<CiclosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CiclosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiclosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
