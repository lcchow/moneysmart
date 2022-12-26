import { TestBed } from '@angular/core/testing';

import { TransactionListResolver } from './transaction-list.resolver';

describe('TransactionListResolver', () => {
  let resolver: TransactionListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TransactionListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
