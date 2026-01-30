import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarymovieComponent } from './librarymovie.component';

describe('LibrarymovieComponent', () => {
  let component: LibrarymovieComponent;
  let fixture: ComponentFixture<LibrarymovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarymovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarymovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
