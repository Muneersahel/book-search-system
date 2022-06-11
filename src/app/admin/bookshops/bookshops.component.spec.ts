import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookshopsComponent } from './bookshops.component';

describe('BookshopsComponent', () => {
  let component: BookshopsComponent;
  let fixture: ComponentFixture<BookshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookshopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
