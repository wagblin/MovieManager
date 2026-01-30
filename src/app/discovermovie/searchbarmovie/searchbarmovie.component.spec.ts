import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarmovieComponent } from './searchbarmovie.component';

describe('SearchbarmovieComponent', () => {
  let component: SearchbarmovieComponent;
  let fixture: ComponentFixture<SearchbarmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbarmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
