import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAboutCurriculumComponent } from './view-about-curriculum.component';

describe('ViewAboutCurriculumComponent', () => {
  let component: ViewAboutCurriculumComponent;
  let fixture: ComponentFixture<ViewAboutCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAboutCurriculumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAboutCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
