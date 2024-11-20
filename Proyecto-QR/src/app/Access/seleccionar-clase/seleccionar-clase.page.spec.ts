import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionarClasePage } from './seleccionar-clase.page';

describe('SeleccionarClasePage', () => {
  let component: SeleccionarClasePage;
  let fixture: ComponentFixture<SeleccionarClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
