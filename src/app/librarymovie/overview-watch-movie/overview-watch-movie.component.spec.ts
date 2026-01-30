import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWatchMovieComponent } from './overview-watch-movie.component';

describe('OverviewWatchMovieComponent', () => {
  let component: OverviewWatchMovieComponent;
  let fixture: ComponentFixture<OverviewWatchMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWatchMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWatchMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
