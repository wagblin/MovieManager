import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWishTvComponent } from './overview-wish-tv.component';

describe('OverviewWishTvComponent', () => {
  let component: OverviewWishTvComponent;
  let fixture: ComponentFixture<OverviewWishTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewWishTvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewWishTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
