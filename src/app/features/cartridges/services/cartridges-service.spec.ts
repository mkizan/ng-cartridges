import { TestBed } from '@angular/core/testing';
import { CartridgesService } from './cartridges-service';

describe('CartridgeService', () => {
  let service: CartridgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartridgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
