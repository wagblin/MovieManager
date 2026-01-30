import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeealltvComponent } from './seealltv.component';

describe('SeealltvComponent', () => {
  let component: SeealltvComponent;
  let fixture: ComponentFixture<SeealltvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeealltvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeealltvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
