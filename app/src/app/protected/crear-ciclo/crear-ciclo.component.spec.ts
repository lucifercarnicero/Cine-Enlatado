import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCicloComponent } from './crear-ciclo.component';

describe('CrearCicloComponent', () => {
  let component: CrearCicloComponent;
  let fixture: ComponentFixture<CrearCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCicloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
