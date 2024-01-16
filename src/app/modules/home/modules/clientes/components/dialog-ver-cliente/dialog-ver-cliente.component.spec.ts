import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerClienteComponent } from './dialog-ver-cliente.component';

describe('DialogVerClienteComponent', () => {
  let component: DialogVerClienteComponent;
  let fixture: ComponentFixture<DialogVerClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogVerClienteComponent]
    });
    fixture = TestBed.createComponent(DialogVerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
