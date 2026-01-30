import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTrendMovieComponent } from './overview-trend-movie.component';

describe('OverviewTrendMovieComponent', () => {
  let component: OverviewTrendMovieComponent;
  let fixture: ComponentFixture<OverviewTrendMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTrendMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewTrendMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
