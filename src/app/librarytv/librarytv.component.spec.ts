import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarytvComponent } from './librarytv.component';

describe('LibrarytvComponent', () => {
  let component: LibrarytvComponent;
  let fixture: ComponentFixture<LibrarytvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarytvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarytvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
