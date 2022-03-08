import { TestBed } from '@angular/core/testing';

import { FrameServiceService } from './frame-service.service';

describe('FrameServiceService', () => {
  let service: FrameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
