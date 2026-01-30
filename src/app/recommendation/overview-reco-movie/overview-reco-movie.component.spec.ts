import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRecoMovieComponent } from './overview-reco-movie.component';

describe('OverviewRecoMovieComponent', () => {
  let component: OverviewRecoMovieComponent;
  let fixture: ComponentFixture<OverviewRecoMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewRecoMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewRecoMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
