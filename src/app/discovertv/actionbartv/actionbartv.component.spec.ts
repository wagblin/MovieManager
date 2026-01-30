import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionbartvComponent } from './actionbartv.component';

describe('ActionbartvComponent', () => {
  let component: ActionbartvComponent;
  let fixture: ComponentFixture<ActionbartvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionbartvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionbartvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
