import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestCurriculumComponent } from './view-guest-curriculum.component';

describe('ViewGuestCurriculumComponent', () => {
  let component: ViewGuestCurriculumComponent;
  let fixture: ComponentFixture<ViewGuestCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestCurriculumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuestCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
