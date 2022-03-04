import { TestBed } from '@angular/core/testing';

import { PokedexSearchService } from './pokedex-search.service';

describe('PokedexSearchService', () => {
  let service: PokedexSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
