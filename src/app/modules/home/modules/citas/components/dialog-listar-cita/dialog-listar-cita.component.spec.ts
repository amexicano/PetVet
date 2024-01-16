import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListarCitaComponent } from './dialog-listar-cita.component';

describe('DialogListarCitaComponent', () => {
  let component: DialogListarCitaComponent;
  let fixture: ComponentFixture<DialogListarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogListarCitaComponent]
    });
    fixture = TestBed.createComponent(DialogListarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
