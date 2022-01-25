import { TestBed } from '@angular/core/testing';

import { PokedexOptionsService } from './pokedex-options.service';

describe('PokedexOptionsService', () => {
  let service: PokedexOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
