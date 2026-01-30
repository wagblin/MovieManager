import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsheetmovieComponent } from './detailsheetmovie.component';

describe('DetailsheetmovieComponent', () => {
  let component: DetailsheetmovieComponent;
  let fixture: ComponentFixture<DetailsheetmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsheetmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsheetmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
