import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbartvComponent } from './searchbartv.component';

describe('SearchbartvComponent', () => {
  let component: SearchbartvComponent;
  let fixture: ComponentFixture<SearchbartvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbartvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchbartvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
