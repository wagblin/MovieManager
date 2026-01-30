import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWatchTvComponent } from './overview-watch-tv.component';

describe('OverviewWatchTvComponent', () => {
  let component: OverviewWatchTvComponent;
  let fixture: ComponentFixture<OverviewWatchTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWatchTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWatchTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
