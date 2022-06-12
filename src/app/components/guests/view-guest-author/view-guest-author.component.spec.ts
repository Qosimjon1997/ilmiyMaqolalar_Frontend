import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestAuthorComponent } from './view-guest-author.component';

describe('ViewGuestAuthorComponent', () => {
  let component: ViewGuestAuthorComponent;
  let fixture: ComponentFixture<ViewGuestAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuestAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
