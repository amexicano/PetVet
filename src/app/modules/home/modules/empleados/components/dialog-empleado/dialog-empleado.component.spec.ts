import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmpleadoComponent } from './dialog-empleado.component';

describe('DialogEmpleadoComponent', () => {
  let component: DialogEmpleadoComponent;
  let fixture: ComponentFixture<DialogEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogEmpleadoComponent]
    });
    fixture = TestBed.createComponent(DialogEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
