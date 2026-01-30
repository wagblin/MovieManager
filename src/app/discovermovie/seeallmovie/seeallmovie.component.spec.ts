import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeallmovieComponent } from './seeallmovie.component';

describe('SeeallmovieComponent', () => {
  let component: SeeallmovieComponent;
  let fixture: ComponentFixture<SeeallmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeallmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeallmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
