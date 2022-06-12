import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAboutAuthorComponent } from './view-about-author.component';

describe('ViewAboutAuthorComponent', () => {
  let component: ViewAboutAuthorComponent;
  let fixture: ComponentFixture<ViewAboutAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAboutAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAboutAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
