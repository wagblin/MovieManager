import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionbarmovieComponent } from './actionbarmovie.component';

describe('ActionbarmovieComponent', () => {
  let component: ActionbarmovieComponent;
  let fixture: ComponentFixture<ActionbarmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionbarmovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionbarmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
