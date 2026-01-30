import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWishMovieComponent } from './overview-wish-movie.component';

describe('OverviewWishMovieComponent', () => {
  let component: OverviewWishMovieComponent;
  let fixture: ComponentFixture<OverviewWishMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWishMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWishMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
