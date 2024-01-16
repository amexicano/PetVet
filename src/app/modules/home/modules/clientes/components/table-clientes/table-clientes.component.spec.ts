import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableClientesComponent } from './table-clientes.component';

describe('TableClientesComponent', () => {
  let component: TableClientesComponent;
  let fixture: ComponentFixture<TableClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableClientesComponent]
    });
    fixture = TestBed.createComponent(TableClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
