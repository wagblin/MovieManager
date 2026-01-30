import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTrendTvComponent } from './overview-trend-tv.component';

describe('OverviewTrendTvComponent', () => {
  let component: OverviewTrendTvComponent;
  let fixture: ComponentFixture<OverviewTrendTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewTrendTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewTrendTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
