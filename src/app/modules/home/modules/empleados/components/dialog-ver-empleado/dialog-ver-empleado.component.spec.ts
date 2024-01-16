import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerEmpleadoComponent } from './dialog-ver-empleado.component';

describe('DialogVerEmpleadoComponent', () => {
  let component: DialogVerEmpleadoComponent;
  let fixture: ComponentFixture<DialogVerEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogVerEmpleadoComponent]
    });
    fixture = TestBed.createComponent(DialogVerEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
