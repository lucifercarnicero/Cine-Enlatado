import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCicloComponent } from './editar-ciclo.component';

describe('EditarCicloComponent', () => {
  let component: EditarCicloComponent;
  let fixture: ComponentFixture<EditarCicloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCicloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCicloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
