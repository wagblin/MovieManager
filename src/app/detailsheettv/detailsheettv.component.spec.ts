import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsheettvComponent } from './detailsheettv.component';

describe('DetailsheettvComponent', () => {
  let component: DetailsheettvComponent;
  let fixture: ComponentFixture<DetailsheettvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsheettvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsheettvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
