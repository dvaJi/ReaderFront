import { TestBed, inject } from '@angular/core/testing';

import { ApplyService } from './apply.service';

describe('ApplyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplyService]
    });
  });

  it('should be created', inject([ApplyService], (service: ApplyService) => {
    expect(service).toBeTruthy();
  }));
});
