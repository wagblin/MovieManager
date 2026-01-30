import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscovermovieComponent } from './discovermovie.component';

describe('DiscovermovieComponent', () => {
  let component: DiscovermovieComponent;
  let fixture: ComponentFixture<DiscovermovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscovermovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscovermovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
