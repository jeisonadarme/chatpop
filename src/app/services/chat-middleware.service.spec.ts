import { TestBed, inject } from '@angular/core/testing';

import { ChatMiddlewareService } from './chat-middleware.service';

describe('ChatMiddlewareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatMiddlewareService]
    });
  });

  it('should be created', inject([ChatMiddlewareService], (service: ChatMiddlewareService) => {
    expect(service).toBeTruthy();
  }));
});
