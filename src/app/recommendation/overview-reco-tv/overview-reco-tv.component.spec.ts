import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRecoTvComponent } from './overview-reco-tv.component';

describe('OverviewRecoTvComponent', () => {
  let component: OverviewRecoTvComponent;
  let fixture: ComponentFixture<OverviewRecoTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewRecoTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewRecoTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
