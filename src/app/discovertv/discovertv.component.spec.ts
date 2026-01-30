import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscovertvComponent } from './discovertv.component';

describe('DiscovertvComponent', () => {
  let component: DiscovertvComponent;
  let fixture: ComponentFixture<DiscovertvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscovertvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscovertvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
