import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingBoxComponent } from './searching-box.component';

describe('SearchingBoxComponent', () => {
  let component: SearchingBoxComponent;
  let fixture: ComponentFixture<SearchingBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchingBoxComponent]
    });
    fixture = TestBed.createComponent(SearchingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
