import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestArticleComponent } from './view-guest-article.component';

describe('ViewGuestArticleComponent', () => {
  let component: ViewGuestArticleComponent;
  let fixture: ComponentFixture<ViewGuestArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuestArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
