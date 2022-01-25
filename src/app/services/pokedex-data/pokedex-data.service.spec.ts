import { TestBed } from '@angular/core/testing';

import { PokedexDataService } from './pokedex-data.service';

describe('PokedexService', () => {
  let service: PokedexDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
