import { TestBed } from '@angular/core/testing';

import { TokenvalidatorInterceptor } from './tokenvalidator.interceptor';

describe('TokenvalidatorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenvalidatorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenvalidatorInterceptor = TestBed.inject(TokenvalidatorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
