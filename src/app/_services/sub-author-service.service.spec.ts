import { TestBed } from '@angular/core/testing';

import { SubAuthorServiceService } from './sub-author-service.service';

describe('SubAuthorServiceService', () => {
  let service: SubAuthorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubAuthorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
